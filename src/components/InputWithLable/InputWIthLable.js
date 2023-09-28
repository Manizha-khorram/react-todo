import React, { useEffect, useRef } from 'react'
import styles from './InputWIthLable.module.css'
import PropTypes from 'prop-types'

const InputWithLable = ({ todoTitle, handelTitleChange, children }) => {
    // const inputRef = useRef()

    // //sorting

    // useEffect(() => {
    //     inputRef.current.focus()
    // }, [])

    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input
                id="todoTitle"
                placeholder="Enter todo title"
                name="title"
                value={todoTitle}
                onChange={handelTitleChange}
                // ref={inputRef}
                className={styles['todoInput']}
            />
        </>
    )
}

InputWithLable.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    handelTitleChange: PropTypes.func.isRequired,
    children: PropTypes.node, //to allow any type of childeren
}

export default InputWithLable
