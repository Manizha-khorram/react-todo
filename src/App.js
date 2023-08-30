import React, { useState, useEffect } from 'react'
import TodoList from './TodoList/TodoList'
import AddTodoForm from './AddTodoForm/AddTodoForm'
import SearchForm from './SearchForm/SearchForm'
import styles from './App.module.css'
import NavBar from './NavBar/NavBar.js'
import NewCustomList from './NewCustomList/NewCustomList'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'


function App() {
    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isListVisible, setIsListVisible] = useState(0)

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [newListTitle, setNewListTitle] = useState('')

    const [searchTerm, setSearchTerm] = useState('')
    const [activeListIndex, setActiveListIndex] = useState(null); 
    const [animate, setAnimate] = useState(false)
    const [Descriptions, setDescriptions] = useState(Array(todoList.length).fill(''))


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
            console.log('todoData', todoData)
            console.log('lists', listData)
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
                    title: list.fields.ListName,
                    Descriptions: list.fields.Descriptions,
                    todos: todos.filter((todo) => todo.listId === list.id),
                }
            })
           console.log('listsss', lists)
            setTodoList([...lists, ...todoList]);
            setDescriptions(Array(todoList.length).fill(''))
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
                        Descriptions:''
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
        

        <BrowserRouter>
         <NavBar />
        <Routes>
            <Route path='/'    element={
                <>
               
            <div className={styles['container']}>
               
                <div className={styles['background-element']}>
                <div  className={styles['first-child']}>
                <AddTodoForm onAddtodo={addTodo} />
                </div>
                <div className={styles['second-child']}>
                <div className={styles['menu-elements']}>
                    <SearchForm onSearch={searchTodo} />
                    {todoList.map((list, index) => (
                        <button
                            key={index}
                            onClick={() => {   console.log('Clicked button with index:', index);
                            console.log('List ID:', list.id);
                            const listIndex = todoList.findIndex((item) => item.id === list.id);
                            console.log('Computed list index:', listIndex);
                             setIsListVisible(listIndex); setActiveListIndex(index); setAnimate(true)}}
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
                        onClick={() => setIsFormVisible(true) }
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
                
                <div>
                  
                    
                  
                        <TodoList
                            className={styles.TodoList}
                            todoList={
                                isListVisible >= 0  && todoList.length > 0
                                    ? todoList[isListVisible].todos
                                    : []
                            }
                            
                            onRemoveTodo={removeTodo}
                            onToggleFavorite={toggleFavorite}
                            searchTerm={searchTerm}
                            isLoading={isLoading}
                            activeListIndex={activeListIndex}
                            animate={animate}
                            setAnimate={setAnimate}
                            isListVisible={isListVisible}
                            Descriptions={Descriptions}
                            setDescriptions={setDescriptions}  
                            listId={
                                isListVisible >= 0  && todoList.length > 0 ?
                                todoList[isListVisible].id : undefined}
                        />
                 
                    <Link to="/new" className={styles['break']}>let's take a break</Link>
                </div>
                </div>
                </div>
            </div>
            <footer style={{ height: '20%', backgroundColor:'red'}}></footer>
            </>
            }/>
            <Route  path='/new' element={<h1 style={{color: 'red'}}> Hi...</h1>}/>
        </Routes>
            </BrowserRouter>
    
    )
}

export default App

// 1.whenever we are making changes to arrays or objects that are part of our application's data flow or state management, it's a good practice to create shallow copies to ensure data integrity and prevent unintended side effects.
