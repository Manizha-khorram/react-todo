import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import SearchForm from './SearchForm'
import styles from './App.module.css'
import NavBar from './NavBar.js'
import NewCustomList from './NewCustomList'

function App() {
    const [todoList, setTodoList] = useState([
        { title: 'MyTodoList', todos: [] },
    ])
    const [isLoading, setIsLoading] = useState(true)
    const [isListVisible, setIsListVisible] = useState(0)

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [newListTitle, setNewListTitle] = useState('')

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
        setTodoList((prevtodoLost) => {
            const updatedLists = [...prevtodoLost]
            updatedLists[isListVisible].todos.push(newTodo)
            return updatedLists
        })
    }

    const searchTodo = (searchTerm) => {
        setSearchTerm(searchTerm)
    }

    const removeTodo = (id) => {
        setTodoList((prevTodoList) => {
            const updatedLists = prevTodoList.map((list) => {
                return {
                    ...list,
                    todos: list.todos.filter((todo) => todo.id !== id),
                }
            })
            return updatedLists
        })
    }

    const toggleFavorite = (id) => {
        const updatedTodos = todoList.map((list) => {
            return {
                ...list,
                todos: list.todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, isFavorite: !todo.isFavorite }
                    }
                    return todo
                }),
            }
        })

        setTodoList(updatedTodos)
    }

    const addNewList = (title) => {
        setTodoList([...todoList, { title, todos: [] }])
        setNewListTitle('')
        setIsFormVisible(false)
    }

    const closeAddModel = (event) => {
        setIsFormVisible(false)
    }

    return (
        <>
            <NavBar></NavBar>

            <div className={styles['container']}>
                <div className={styles['menu-elements']}>
                    <SearchForm onSearch={searchTodo} />
                    {todoList.map((list, index) => (
                        <button
                            key={index}
                            onClick={() => setIsListVisible(index)}
                            className={
                                index === isListVisible
                                    ? styles['active-list']
                                    : ''
                            }
                        >
                            {list.title}
                        </button>
                    ))}
                    <button
                        className={styles['add-list']}
                        onClick={() => setIsFormVisible(true)}
                    >
                        AddList
                    </button>
                </div>
                <div
                    className={styles[`model-container`]}
                    style={{ display: isFormVisible ? 'flex' : 'none' }}
                >
                    {isFormVisible && (
                        <NewCustomList
                            className={styles[`model-card`]}
                            onSubmit={(title) => {
                                addNewList(title)
                                setIsFormVisible(false)
                            }}
                            title={newListTitle}
                            setTitle={setNewListTitle}
                            onClose={closeAddModel}
                        />
                    )}
                </div>
                <div className={styles['background-element']}>
                    <br />
                    <AddTodoForm onAddtodo={addTodo} />
                    {/* {isLoading && <p>....isLoading</p>} */}

                    {isListVisible >= 0 && (
                        <TodoList
                            className={styles.TodoList}
                            todoList={
                                todoList[isListVisible]
                                    ? todoList[isListVisible].todos
                                    : []
                            }
                            onRemoveTodo={removeTodo}
                            onToggleFavorite={toggleFavorite}
                            searchTerm={searchTerm}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default App
