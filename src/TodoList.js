import React from 'react'
import TodoListItem from './TodoListItem'

const TodoList = ({
    todoList,
    favoriteList,
    onRemoveTodo,
    onToggleFavorite,
    searchTerm,
}) => {
    console.log('searchTerm', `"${searchTerm}"`)
    const filteredTodoList = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log('todoList', todoList, "filteredTodoList",filteredTodoList)

    return (
        <div>
            <div>
                <p>
                    <strong>My Todo List</strong>
                </p>
                <hr />
                <ul>
                    {filteredTodoList.map((todo) => (
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
                            isFavoriteList = {true}

                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoList
