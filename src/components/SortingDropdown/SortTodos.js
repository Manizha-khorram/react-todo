import React from 'react'
import Select from 'react-select'
import styles from './SortTodos.module.css'

const SortingDropdown = ({ onChange }) => {
    const options = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
        { value: 'completedAt', label: 'Created Time' },
    ]

    const handleChange = (selectedOption) => {
        onChange(selectedOption.value)
    }

    return (
        <Select
            options={options}
            onChange={handleChange}
            defaultValue={options[0]}
            className={styles['Sort-todo-lists']}
            isSearchable={false}
        />
    )
}

export default SortingDropdown
