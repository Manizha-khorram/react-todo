import React, { useState } from 'react'
import InputWithLable from '../InputWithLable/InputWIthLable'
import styles from './AddTodoForm.module.css'

const AddTodoForm = ({ onAddtodo }) => {
    const [todoTitle, setTodoTitle] = useState('')

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
            id: Date.now(),
        })
        setTodoTitle('')
    }
    return (
        <form onSubmit={handleAddTodo} className={styles.form}>
            <InputWithLable
                todoTitle={todoTitle}
                handelTitleChange={handelTitleChange}
                className={styles['todoIput']}
            ></InputWithLable>

            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm
