import React from 'react'

const todoList = [
    {
        id: 1,
        title: 'Complete assignment',
    },
    {
        id: 2,
        title: 'Play with kids',
    },
    {
        id: 3,
        title: 'Buy some groceries',
    },
]

const TodoList = () => {
    return (
        <ul>
            {todoList.map((x) => (
                <li key={x.id}>{x.title}</li>
            ))}
        </ul>
    )
}

export default TodoList
