import React, { useState } from 'react'
import TodoListItem from './TodoListItem'
import styles from './TodoList.module.css'

const TodoList = ({
    todoList,
    onRemoveTodo,
    onToggleFavorite,
    searchTerm,
    isLoading,
}) => {

    if (isLoading) {
        return <p>....isLoading</p>
    }


    const filteredTodoList = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log('todoList', todoList, "filteredTodoList",filteredTodoList)

    const [prioritize, setPrioritize] = useState(false)


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

    return (
        <div>
            <div>
                <ul className={styles['todo-lists']}>
                    {sortedTodoList.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            title={todo.title}
                            onRemoveTodo={onRemoveTodo}
                            onToggleFavorite={onToggleFavorite}
                            isFavoriteList = {false}
                        />
                    ))}
                </ul>

                <button onClick={handelStarsOrder}> Prioritize</button>

            </div>
        </div>
    )
}

export default TodoList
