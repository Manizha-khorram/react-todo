import React from 'react'
import TodoListItem from './TodoListItem'

const TodoList = ({ todoList, favoriteList }) => {
    return (
        <div>
            <div>
                <p>
                    <strong>{todoList[0].title}</strong>
                </p>
                <hr />
                <ul>
                    {todoList.slice(1).map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            title={todo.title}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <p>
                    <strong>My Favorite</strong>
                </p>
                <hr />
                <ul>
                    {favoriteList.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            title={todo.title}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoList
