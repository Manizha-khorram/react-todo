import React from 'react'

const AddTodoForm = () => {
    return (
        <form>
            <label htmlFor="todoTitle" text="title"></label>
            <input id="todoTitle" placeholder="Enter todo title" />
            <button>Add</button>
        </form>
    )
}

export default AddTodoForm
