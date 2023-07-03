import React, { useState } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {
    //State variables for todo list and favorite list
    const [todoList, setTodoList] = useState([{ title: 'My Todo List' }])
    const [favoriteList, setFavoriteList] = useState([])

    //function to add new item to todo list based on its category
    const addTodo = (newTodo) => {
        if (newTodo.category === 'mytodo') {
            setTodoList((prevTodoList) => [...prevTodoList, newTodo])
        } else if (newTodo.category === 'favorite') {
            setFavoriteList((prevFavoritList) => [...prevFavoritList, newTodo])
        }
    }

    return (
        <div>
            <header>
                <h1>Todo List</h1>
            </header>
            <hr />
            <AddTodoForm onAddtodo={addTodo} />
            <TodoList todoList={todoList} favoriteList={favoriteList} />
        </div>
    )
}

export default App
