import React from 'react'
import PropTypes from 'prop-types'

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

NewCustomList.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
}

export default NewCustomList
