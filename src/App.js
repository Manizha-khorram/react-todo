import React from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
    return (
        <div>
            <header>
                <h1>Todo List</h1>
            </header>
            <hr />
            <AddTodoForm />
            <TodoList />
        </div>
    )
}

export default App
