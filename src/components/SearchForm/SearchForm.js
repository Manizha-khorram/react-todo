import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
        <div className={styles['form-container']}>
            <form onSubmit={handelSearchSubmit}>
                <input
                    className={styles['searchQuery']}
                    id="searchQuery"
                    name="search"
                    value={searchQuery}
                    onChange={handdleSearchChange}
                    type="text"
                    placeholder="search ..."
                />
                <button>search</button>
            </form>
        </div>
    )
}

SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
  }


export default SearchForm
