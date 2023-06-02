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
function App() {
    return (
        <div>
            <header>
                <h1>Todo List</h1>
            </header>
            <hr />

            <ul>
                {todoList.map((x) => (
                    <li key={x.id}>{x.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default App
