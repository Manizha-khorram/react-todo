import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

const useSemiPersistentState = (key, intializedState) => {
    //State variables for todo list and favorite list
    const [value, setValue] = useState(() => {
        const savedList = localStorage.getItem(key)
        return JSON.parse(savedList) || intializedState
    })

    //useEffect
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}

function App() {
    const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', [])
    const [favoriteList, setFavoriteList] = useSemiPersistentState(
        'savedFavoriteList',
        []
    )

    //function to add new item to todo list based on its category
    const addTodo = (newTodo) => {
        if (newTodo.category === 'mytodo') {
            setTodoList((prevTodoList) => [...prevTodoList, newTodo])
        } else if (newTodo.category === 'favorite') {
            setFavoriteList((prevFavoritList) => [...prevFavoritList, newTodo])
        }
    }

    return (
        <>
            <header>
                <h1>Todo List</h1>
            </header>
            <hr />
            <AddTodoForm onAddtodo={addTodo} />
            <TodoList todoList={todoList} favoriteList={favoriteList} />
        </>
    )
}

export default App
