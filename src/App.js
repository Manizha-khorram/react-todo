import React, { useState } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
    const [newTodo, setnewTodo] = useState('')
    return (
        <div>
            <header>
                <h1>Todo List</h1>
            </header>
            <hr />
            <AddTodoForm onAddtodo={setnewTodo} />
            <p>
                <strong>New Todo List Item:{newTodo}</strong>{' '}
            </p>
            <TodoList />
        </div>
    )
}

export default App
