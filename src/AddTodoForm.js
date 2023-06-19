import React from 'react'

const AddTodoForm = ({ onAddtodo }) => {
    const handleAddTodo = (event) => {
        event.preventDefault()
        const todoTitle = event.target.title.value
        console.log('todoTitle', todoTitle)
        onAddtodo(todoTitle)
        event.target.reset()
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle"></label>
            <input id="todoTitle" placeholder="Enter todo title" name="title" />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm
