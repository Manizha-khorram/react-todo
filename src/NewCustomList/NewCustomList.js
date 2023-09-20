import React from 'react'

const NewCustomList = ({ onSubmit, onClose, title, setTitle }) => {
    const handelAddList = (event) => {
        event.preventDefault()
        onSubmit(title)
        setTitle('')
        onClose()
    }

    return (
        <form onSubmit={handelAddList}>
            <input
                id="title"
                value={title}
                name="title"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter List title"
            />

            <button type="submit"> Add List</button>
            <button type="button" onClick={onClose}>
                Close
            </button>
        </form>
    )
}

export default NewCustomList
