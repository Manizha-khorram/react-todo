import React, { useState } from 'react'
import InputWithLable from './InputWIthLable'

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
            <InputWithLable
                todoTitle={todoTitle}
                handelTitleChange={handelTitleChange}
                handelCheckboxChange={handelCheckboxChange}
                todoCategory={todoCategory}
            >
                Title:{' '}
            </InputWithLable>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm
