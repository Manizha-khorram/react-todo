import React, { useState } from 'react'

const AddTodoForm = ({ onAddtodo }) => {
    const [todoTitle, setTodoTitle] = useState('')
    const [todoCategory, setTodoCategory] = useState([])

    //handeling checkbox event
    const handelCheckboxChange = (event) => {
        const { name, checked } = event.target
        setTodoCategory(checked ? name : '')
    }
    //handeling title change, captures the new value from the event object and updates the todoTitle state using the setTodoTitle function.
    const handelTitleChange = (event) => {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }

    //handeling the addition of new item.
    const handleAddTodo = (event) => {
        event.preventDefault()
        console.log('todoTitle', todoTitle)
        onAddtodo({
            title: todoTitle,
            category: todoCategory,
            id: Date.now(),
        })
        setTodoTitle('')
        setTodoCategory('')
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle"></label>
            <input
                id="todoTitle"
                placeholder="Enter todo title"
                name="title"
                value={todoTitle}
                onChange={handelTitleChange}
            />
            <div>
                <label htmlFor="mytodo">
                    <input
                        type="checkbox"
                        id="mytodo"
                        name="mytodo"
                        checked={todoCategory.includes('mytodo')}
                        onChange={handelCheckboxChange}
                    />
                    My Todo List
                </label>
            </div>
            <div>
                <label htmlFor="favorite">
                    <input
                        type="checkbox"
                        id="favorite"
                        name="favorite"
                        checked={todoCategory.includes('favorite')}
                        onChange={handelCheckboxChange}
                    />
                    My Favorite List
                </label>
            </div>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm
