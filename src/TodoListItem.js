import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const TodoListItem = ({ todo, onRemoveTodo, onToggleFavorite }) => {

    const renderStarIcon = () => {
        return todo.isFavorite ? (
            <AiFillStar onClick={() => onToggleFavorite(todo.id)}></AiFillStar>
        ) : (
            <AiOutlineStar
                onClick={() => onToggleFavorite(todo.id)}
            ></AiOutlineStar>
        )
    }

    return (
        <div>
            <li>
                {todo.title}{' '}
                <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
                {renderStarIcon()}
            </li>
        </div>
    )
}

export default TodoListItem
