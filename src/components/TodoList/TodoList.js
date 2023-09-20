import React, { useState, useEffect } from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import styles from './TodoList.module.css'
import { motion } from 'framer-motion/dist/framer-motion'
import PropTypes from 'prop-types'
import SortingDropdown from '../SortingDropdown/SortTodos'

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
    currentPage,
    itemsPerPage,
}) => {
    if (isLoading) {
        return <p>....isLoading</p>
    }

    const filteredTodoList = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const [sortingOption, setSortingOption] = useState('')

    const [prioritize, setPrioritize] = useState(false)

    useEffect(() => {
        setSortingOption(sortingOption)
    }, [todoList, sortingOption])
    //sorting
    const handleSortChange = (option) => {
        setSortingOption(option)
    }

    const sortedTodoList = filteredTodoList.sort((a, b) => {
        const firstLetterA = a.title.charAt(0).toLowerCase() // Get the first letter of title A
        const firstLetterB = b.title.charAt(0).toLowerCase() // Get the first letter of title B

        if (sortingOption === 'asc') {
            return firstLetterA.localeCompare(firstLetterB) //Note2
        } else if (sortingOption === 'desc') {
            return firstLetterB.localeCompare(firstLetterA)
        } else if (sortingOption === 'completedAt') {
            const timeA = new Date(a.completedAt).getTime()
            const timeB = new Date(b.completedAt).getTime()
            return timeA - timeB
        } else {
            // Default sorting by ID
            return b.id - a.id
        }
    })

    if (prioritize) {
        sortedTodoList.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1
            if (!a.isFavorite && b.isFavorite) return 1
            return 0
        })
    }

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
            if (!response.ok) {
                throw new Error('Erorr', `${response.status}`)
            }
            const Descriptions = data.fields.Descriptions || ''
            setDescriptions(Descriptions)
        } catch (err) {}
    }

    const handleDescriptionChange = async (event) => {
        if (event.key === 'Enter') {
            setDescriptions(event.target.value)
            try {
                const response = await fetch(`${listUrl}/${listId}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fields: {
                            Descriptions: event.target.value,
                        },
                    }),
                })

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
            fetchDescriptionChange()
        }
    }, [activeListIndex, isListVisible])

    const todoListsClassName = `${styles['todo-lists']} ${
        activeListIndex >= 0 ? styles['visible'] : '' // Applied the animation style only if there's an active list
    }`

    //Pagination

    let startIndex = (currentPage - 1) * itemsPerPage
    let endIndex = startIndex + itemsPerPage

    if (startIndex < 0) {
        startIndex = 0
    }
    if (endIndex > sortedTodoList.length) {
        endIndex = sortedTodoList.length
    }

    // Slice the sortedTodoList to display only the items for the current page
    const currentItems = sortedTodoList.slice(startIndex, endIndex)

    // ...

    return (
        <>
            <div>
                <SortingDropdown onChange={handleSortChange} />
            </div>
            <div className={styles['todo-lists-container']}>
                <motion.ul
                    className={todoListsClassName}
                    initial="hidden"
                    animate={animate ? 'visible' : 'hidden'}
                    variants={todoListsVariants}
                >
                    {currentItems.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            title={todo.title}
                            onRemoveTodo={onRemoveTodo}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </motion.ul>
                <div className={styles['prioritize-container']}>
                    <button onClick={handelStarsOrder}> Prioritize</button>
                </div>
                <div className={styles['description-container']}>
                    <input
                        value={Descriptions || ''}
                        name="Descriptions"
                        placeholder="Add Descriptions"
                        id="Descriptions"
                        onChange={(event) => {
                            setDescriptions(event.target.value)
                        }}
                        onKeyDown={handleDescriptionChange}
                        className={styles['description-input']}
                    />{' '}
                </div>
            </div>
        </>
    )
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
        })
    ),
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    activeListIndex: PropTypes.number,
    setAnimate: PropTypes.func.isRequired,
    animate: PropTypes.bool.isRequired,
    isListVisible: PropTypes.number.isRequired,
    Descriptions: PropTypes.arrayOf(PropTypes.string),
    setDescriptions: PropTypes.func.isRequired,
    listId: PropTypes.string,
}

export default TodoList

//Note1 : We are converting the completedAt property of object a (which is assumed to contain a date or timestamp) into a JavaScript Date object using new Date(a.completedAt). Then, we use the .getTime() method on the Date object to obtain the timestamp in milliseconds. This timestamp represents the time when the task was completed.
//Note2 : The localeCompare function is commonly used for string comparison and sorting in JavaScript. It's a method available on JavaScript string objects, and it's used to determine whether one string comes before, after, or is the same as another string in a sorted order.
