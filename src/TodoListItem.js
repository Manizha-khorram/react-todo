import React from 'react'

const TodoListItem = ({ todo, onRemoveTodo }) => {
    //we can use (title) prop here as well to deal with titles, no need for todo prop!?

    return (
        <div>
            <li>
                {todo.title}{' '}
                <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
            </li>
        </div>
    )
}

export default TodoListItem
