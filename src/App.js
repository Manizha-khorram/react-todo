import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import SearchForm from './SearchForm'
import styles from './App.module.css'
import NavBar from './NavBar.js'
import NewCustomList from './NewCustomList'

function App() {
    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isListVisible, setIsListVisible] = useState(0)

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [newListTitle, setNewListTitle] = useState('')

    const [searchTerm, setSearchTerm] = useState('')

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
    const listUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME_LIST}`

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        }

        try {
            const todoResponse = await fetch(url, options)
            const listResponse = await fetch(listUrl, options)

            if (!todoResponse.ok) {
                throw new Error(`Error has occured ${todoResponse.status}`)
            }

            if (!listResponse.ok) {
                throw new Error(`Error has occured ${listResponse.status}`)
            }


            const todoData = await todoResponse.json()
            const listData = await listResponse.json()
            const todos = todoData.records.map((todo) => {
                const newTodo = {
                    id: todo.id,
                    title: todo.fields.Title,
                    listId: todo.fields.ListId
                }

                return newTodo
            })
           
            const lists = listData.records.map((list) => {

                return {
                    
                    id: list.id,
                    title: list.fields.ListName
                }
            })
            const initialLists = lists.map((listProp) => ({
                ...listProp,
                todos: todos.filter((todo) => todo.listId === listProp.id),

            }));
    
            setTodoList([...initialLists, ...todoList]);
            setIsLoading(false)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    //function to add new item to todo list based on its category
    const addTodo = async (newTodo) => {
        const completedDate = new Date() // Replace with the actual completed date
        const completedDateISO = completedDate.toISOString()
       const listVisible =  todoList[isListVisible]

        //record to post the data
        const recordData = {
            records: [
                {
                    fields: {
                        Title: newTodo.title,
                        completedAt: completedDateISO,
                        ListId: listVisible.id
                        
                    },
                },
            ],
        }

        //header
        const headers = {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(recordData),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const newRecord = await response.json()
            setTodoList((prevtodoLost) => {
                const updatedLists = [...prevtodoLost]
                updatedLists[isListVisible].todos.push({
                    title: newTodo.title,
                    completedAt: completedDateISO,
                    id: newRecord.records[0].id
                })
                return updatedLists
            })
        } catch (err) {
            console.log(err)
        }
    }

    const searchTodo = (searchTerm) => {
        setSearchTerm(searchTerm)
    }

    const removeTodo = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        }

        try {
            const response = await fetch(`${url}/${id}`, options)
            if (!response.ok) {
                throw new Error(`Error occured: ${response.status}`)
            }
            //important : Keep in mind that Airtable doesn't return a response body for successful DELETE requests, so there's no need to use response.json() to parse the response data in this case.
            setTodoList((prevTodoList) => {
                const updatedLists = prevTodoList.map((list) => {
                    return {
                        ...list, //NOTE.1
                        todos: list.todos.filter((todo) => todo.id !== id),
                    }
                })
                return updatedLists
            })
        } catch (err) {
            console.log(err)
        }
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

    const addNewList = async (title) => {
        const listRecord = {
            records: [
                {
                    fields: {
                        ListName: title,
                    },
                },
            ],
        }

        const headers = {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
        }

        try {
            const response = await fetch(listUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(listRecord),
            })

            if (!response.ok) {
                throw new Error(` Error Occurred: ${response.status}`)
            }

            const newListData = await response.json()
            const listIds = newListData.records.map((record) => record.id)
            const newLists = listIds.map((id) => ({
                title,
                todos: [],
                id : id,
            }))
            setTodoList([...todoList, ...newLists])
            setNewListTitle('')
            setIsFormVisible(false)
        } catch (err) {
            console.error(err)
        }
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

// 1.whenever we are making changes to arrays or objects that are part of our application's data flow or state management, it's a good practice to create shallow copies to ensure data integrity and prevent unintended side effects.
