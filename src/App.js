import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import SearchForm from './SearchForm'

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
    //function to search in todo list
    const [searchTerm, setSearchTerm] = useSemiPersistentState('searchTerm', '')

    //function to add new item to todo list based on its category
    const addTodo = (newTodo) => {
        if (newTodo.category === 'mytodo') {
            setTodoList((prevTodoList) => [...prevTodoList, newTodo])
            setSearchTerm('')
        } else if (newTodo.category === 'favorite') {
            setFavoriteList((prevFavoritList) => [...prevFavoritList, newTodo])
        }
    }

    const searchTodo = (searchTerm) => {
        setSearchTerm(searchTerm)
    }

    const removeTodo = (id) => {
        if (todoList) {
            const filteredTodoList = todoList.filter((todo) => todo.id !== id)
            setTodoList(filteredTodoList)
        }
        if (favoriteList) {
            const filteredTodoList = favoriteList.filter(
                (todo) => todo.id !== id
            )
            setFavoriteList(filteredTodoList)
        }
    }

    const toggleFavorite = (id) => {
        const updatedTodos = todoList.map((todo) => {
            if (todo.id === id) {
                //For example, if a todo has isFavorite: true, calling toggleFavorite with its id will update it to isFavorite: false, and vice versa.

                return { ...todo, isFavorite: !todo.isFavorite }
            }
            return todo
        })

        const updatedFavoriteList = updatedTodos.filter(
            (todo) => todo.isFavorite
        )

        setTodoList(updatedTodos)
        setFavoriteList(updatedFavoriteList)
    }

    return (
        <>
            <header>
                <h1>Todo List</h1>
            </header>
            <hr />
            <SearchForm onSearch={searchTodo} />
            <br />
            <AddTodoForm onAddtodo={addTodo} />
            <TodoList
                todoList={todoList}
                favoriteList={favoriteList}
                onRemoveTodo={removeTodo}
                onToggleFavorite={toggleFavorite}
                searchTerm={searchTerm}
            />
        </>
    )
}

export default App
