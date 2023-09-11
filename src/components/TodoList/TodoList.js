import React, { useState, useEffect } from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import styles from './TodoList.module.css'
import { motion } from 'framer-motion/dist/framer-motion'
import PropTypes, { arrayOf } from 'prop-types'

const listUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME_LIST}`

const TodoList = ({
    todoList,
    onRemoveTodo,
    onToggleFavorite,
    searchTerm,
    isLoading,
    activeListIndex,
    setAnimate,
    animate,
    isListVisible,
    Descriptions,
    setDescriptions,
    listId,
}) => {
 

    if (isLoading) {
        return <p>....isLoading</p>
    }

    const filteredTodoList = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const [prioritize, setPrioritize] = useState(false)
    const [shouldResetAnimation, setShouldResetAnimation] = useState(false)

    const fetchDescriptionChange = async () => {
        try {
            const response = await fetch(`${listUrl}/${listId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            console.log('datata', data)
            if (!response.ok) {
                throw new Error('Erorr', `${response.status}`)
            }
            const Descriptions = data.fields.Descriptions || []
            setDescriptions(Descriptions)
        } catch (err) {}
    }

    const handleDescriptionChange = async (event) => {
        if (event.key === 'Enter') {
            const newListIndex = isListVisible
            const newDescriptions = [...Descriptions]
            newDescriptions[newListIndex] = event.target.value
            setDescriptions(newDescriptions)
            event.target.value = ''
            try {
                const response = await fetch(`${listUrl}/${listId}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fields: {
                            Descriptions: Descriptions[isListVisible],
                        },
                    }),
                })

                console.log('data', response.status)
                if (!response.ok) {
                    console.log('error', await response.json())
                    throw new Error(`Error: ${response.status}`)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        if (!Descriptions[isListVisible]) return // No need to update if description is empty
    }, [Descriptions[isListVisible]])

    const sortedTodoList = filteredTodoList.sort((a, b) => {
        if (prioritize) {
            //This ensures that the favorite items come first in the sorted list.
            return b.isFavorite ? 1 : -1
        } else {
            return a.id - b.id
        }
    })
    const handelStarsOrder = (event) => {
        setPrioritize(!prioritize)
    }

    const todoListsVariants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    useEffect(() => {
      
        if (activeListIndex >= 0) {
            setAnimate(true)
            setDescriptions((prevDescriptions) => {
                const newDescriptions = [...prevDescriptions]
                newDescriptions[isListVisible] = Descriptions[isListVisible]
                return newDescriptions
            })

            fetchDescriptionChange()
            // Set shouldResetAnimation to true
            setShouldResetAnimation(true)

            // After a short delay, set shouldResetAnimation back to false
            const timeoutId = setTimeout(() => {
                setShouldResetAnimation(false)
            }, 500) // Adjust the delay as needed

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [activeListIndex, isListVisible])

    const todoListsClassName = `${styles['todo-lists']} ${
        activeListIndex >= 0 ? styles['visible'] : '' // Apply the animation style only if there's an active list
    }`

    // Set animate to false after a short delay to reset the animation

    const activeList = todoList

    return (
        <>
            <div className={styles['todo-lists-container']}>
                <motion.ul
                    className={todoListsClassName}
                    initial="hidden"
                    animate={animate ? 'visible' : 'hidden'}
                    variants={todoListsVariants}
                >
                    {sortedTodoList.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            title={todo.title}
                            onRemoveTodo={onRemoveTodo}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </motion.ul>
                <div>
                    <button onClick={handelStarsOrder}> Prioritize</button>
                </div>
                <div className={styles['description-container']}>
                    <input
                        value={Descriptions || ''}
                        name="Descriptions"
                        placeholder="Add Descriptions"
                        id="Descriptions"
                        onChange={(event) => {
                            const newDescriptions = [...Descriptions]
                            newDescriptions[isListVisible] = event.target.value
                            setDescriptions(newDescriptions)
                        }}
                        onKeyDown={handleDescriptionChange}
                        className={styles['description-input']}
                    />
                    {/* {isListVisible >= 0 && activeList && (
      <div className={styles['list-description-container']}>
        <p className={styles['list-description']} style={{ color: 'white' }}>
          {Descriptions}
        </p>
      </div>
    )} */}
                </div>
            </div>
        </>
    )
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(      
        PropTypes.shape({
          title: PropTypes.string.isRequired,
      })),
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    activeListIndex: PropTypes.number.isRequired,
    setAnimate: PropTypes.func.isRequired,
    animate: PropTypes.bool.isRequired,
    isListVisible: PropTypes.number.isRequired,
    Descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setDescriptions:PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired,
  }


export default TodoList
