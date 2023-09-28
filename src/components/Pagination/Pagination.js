import React from 'react'
import styles from './Paginaion.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    console.log('totalPage', totalPages)
    const handelPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            console.log('Changing to page:', newPage)

            onPageChange(newPage)
        }
    }

    return (
        <div>
            <button onClick={() => handelPageChange(currentPage - 1)}>
                {' '}
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handelPageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    )
}

export default Pagination
