import React from 'react'
import TodoListItem from './TodoListItem'

const TodoList = ({ todoList, favoriteList, onRemoveTodo }) => {
    return (
        <div>
            <div>
                <p>
                    <strong>My Todo List</strong>
                </p>
                <hr />
                <ul>
                    {todoList.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            title={todo.title}
                            onRemoveTodo={onRemoveTodo}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <p>
                    <strong>My Favorite List</strong>
                </p>
                <hr />
                <ul>
                    {favoriteList.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            title={todo.title}
                            onRemoveTodo={onRemoveTodo}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoList
