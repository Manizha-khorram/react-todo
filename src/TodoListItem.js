import React from 'react'

const TodoListItem = ({ todo, title }) => {
    if (title) {
        return (
            <div>
                <hr />
                <strong>{title}</strong>
                <hr />
            </div>
        )
    }
    return (
        <div>
            <li>{todo.title}</li>
        </div>
    )
}

export default TodoListItem
