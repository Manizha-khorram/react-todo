import React, { useEffect, useRef } from 'react'
import styles from './InputWIthLable.module.css'

const InputWithLable = ({ todoTitle, handelTitleChange, children }) => {
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })

    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input
                id="todoTitle"
                placeholder="Enter todo title"
                name="title"
                value={todoTitle}
                onChange={handelTitleChange}
                ref={inputRef}
                className={styles['todoInput']}
            />
        </>
    )
}

export default InputWithLable
