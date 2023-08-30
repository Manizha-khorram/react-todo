import React, { useState, useEffect} from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import styles from './TodoList.module.css'
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

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
    listId
}) => {
    console.log('todolist', todoList)
    console.log('activeList', activeListIndex)
    console.log('isListVisible', isListVisible)
    
    
    if (isLoading) {
        return <p>....isLoading</p>
    }

    const filteredTodoList = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const [prioritize, setPrioritize] = useState(false)
    const [shouldResetAnimation , setShouldResetAnimation] = useState(false)

    const handleDescriptionChange = async (event) => {
        if(event.key === 'Enter'){
        const newListIndex = isListVisible;
        const newDescriptions = [...Descriptions];
        newDescriptions[newListIndex] = event.target.value;
        setDescriptions(newDescriptions);
        console.log('click',  newDescriptions)
        event.target.value = ''
            console.log('patch',  todoList)
            try {
                const response = await fetch(`${listUrl}/${listId}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fields: {
                            Descriptions: Descriptions[isListVisible]
                        },
                    }),
                });
                
                
                if (!response.ok) {
                     console.log('error', await response.json() )
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (err) {
                console.log(err);
            }
        
        }       
};

useEffect(() =>{
    if (!Descriptions[isListVisible]) return; // No need to update if description is empty

},[Descriptions[isListVisible]])


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
                duration: 0.5, // Adjust the duration as needed
            },
        },
    };

    useEffect(() => {
        if (activeListIndex >= 0) {
            // Set animate to true whenever the activeListIndex changes
            setAnimate(true);
            setDescriptions((prevDescriptions) => {
                const newDescriptions = [...prevDescriptions];
                newDescriptions[activeListIndex] =Descriptions[activeListIndex];
                return newDescriptions;
        })
          // Set shouldResetAnimation to true
          setShouldResetAnimation(true);

          // After a short delay, set shouldResetAnimation back to false
          const timeoutId = setTimeout(() => {
              setShouldResetAnimation(false);
          }, 500); // Adjust the delay as needed
  
          return () => {
              clearTimeout(timeoutId);
          };
        }
    }, [activeListIndex]);
  
    const todoListsClassName = `${styles['todo-lists']} ${
        activeListIndex >= 0 ? styles['visible'] : '' // Apply the animation style only if there's an active list
    }`;

    // Set animate to false after a short delay to reset the animation
   

    const activeList = todoList;
    const activeDescription = Descriptions[isListVisible];

    return (
         <>
            <div className={styles['todo-lists-container']} >
                <motion.ul  className={todoListsClassName}
                  initial="hidden"
                  animate={animate ? "visible" : "hidden"}
                  variants={todoListsVariants}>
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
                <input
                   value={Descriptions[isListVisible] || ''}
                   name='Descriptions'
                   placeholder='Descriptions'
                  id="Descriptions"
                  onChange={(event) => {
                    const newDescriptions = [...Descriptions]
                    newDescriptions[isListVisible] = event.target.value
                    setDescriptions(newDescriptions)
                  }}
                  onKeyDown={handleDescriptionChange}
                  className={styles['discreption']}
                />

              {isListVisible >= 0 && activeList && (
          <p className={styles['list-description']}>
           { }
          </p>
        )}
                <button onClick={handelStarsOrder}> Prioritize</button>
            </div>
           
            </>
    )
}

export default TodoList
