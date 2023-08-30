import React, { useState } from 'react'

import styles from './SearchForm.module.css'

const SearchForm = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handelSearchSubmit = (event) => {
        event.preventDefault()
        onSearch(searchQuery)
        setSearchQuery('')
    }

    const handdleSearchChange = (event) => {
        event.preventDefault()
        const searchNewQuery = event.target.value
        setSearchQuery(searchNewQuery)
    }

    return (
        <form onSubmit={handelSearchSubmit}>
            <input
                id="searchQuery"
                name="search"
                value={searchQuery}
                onChange={handdleSearchChange}
                type="text"
                placeholder="search ..."
            />
            <button>search</button>
        </form>
    )
}

export default SearchForm
