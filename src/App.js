import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import SearchForm from './SearchForm'

function App() {
    const [todoList, setTodoList] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    const [favoriteList, setFavoriteList] = useState(() => {
        const savedFavoriteTodo = localStorage.getItem('savedFavoriteList')
        return JSON.parse(savedFavoriteTodo) || []
    })
    //function to search in todo list
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const savedTodo = localStorage.getItem('savedTodoList')
                const intiallValue = JSON.parse(savedTodo) || []
                resolve({ data: { todoList: intiallValue } })
            }, 2000)
        })
            .then((result) => {
                setTodoList(result.data.todoList)
                setIsLoading(false)
                console.log('Loaded initial todoList:', result.data.todoList)
            })
            .catch((error) => {
                console.log('The error is:', error)
                setIsLoading(false)
            })
    }, [])
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList))
        }
    }, [todoList])

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
            {isLoading && <p>....isLoading</p>}
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
