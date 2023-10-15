import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import styles from './TodoListItem.module.css'
import PropTypes from 'prop-types'

const TodoListItem = ({ todo, onRemoveTodo, onToggleFavorite }) => {
    const renderStarIcon = () => {
        return todo.isFavorite ? (
            <AiFillStar
                className={styles['filled-star']}
                onClick={() => onToggleFavorite(todo.id)}
            ></AiFillStar>
        ) : (
            <AiOutlineStar
                onClick={() => onToggleFavorite(todo.id)}
            ></AiOutlineStar>
        )
    }

    return (
        <li className={`${styles['todo-list-items']} visible`}>
            <div className={styles['todo-title']}>{todo.title}</div>
            <button
                onClick={(e) => onRemoveTodo(todo.id)}
                className={styles['remove-button']}
            >
                Completed
            </button>
            <div className={styles['star-icon']}> {renderStarIcon()} </div>
        </li>
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
}
export default TodoListItem
