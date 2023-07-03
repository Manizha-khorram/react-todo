import React from 'react'
import TodoListItem from './TodoListItem'
const todoList = [
    { Title: 'My Todo List' },
    {
        id: 1,
        title: 'Complete assignment',
    },
    {
        id: 2,
        title: 'Cooking',
    },
    {
        id: 3,
        title: 'Buy some groceries',
    },
]
const myFavorit = [
    { Title: 'My Favorite' },
    {
        id: 1,
        title: 'Practice Coding',
    },
    {
        id: 2,
        title: 'Play with kids',
    },
    {
        id: 3,
        title: 'Walking',
    },
]

const TodoList = () => {
    return (
        <ul>
            {todoList.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} title={todo.Title} />
            ))}
            {myFavorit.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} title={todo.Title} />
            ))}
        </ul>
    )
}

export default TodoList
