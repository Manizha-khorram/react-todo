import React, { useEffect, useRef } from 'react'

const InputWithLable = ({
    todoTitle,
    handelTitleChange,
    handelCheckboxChange,
    todoCategory,
    children,
}) => {
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
        </>
    )
}

export default InputWithLable
