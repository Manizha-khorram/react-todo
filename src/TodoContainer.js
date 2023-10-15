
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import SearchForm from './components/SearchForm/SearchForm';
import Pagination from './components/Pagination/Pagination';
import NewCustomList from './components/NewCustomList/NewCustomList';
import styles from './TodoContainer.module.css';
import {
    FirstfetchData,
    FetchTodoItems,
    PostNewLIst,
    RemoveTodoItems,
    RemoveListItem,
} from './util/fetch';

function TodoContainer() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isListVisible, setIsListVisible] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newListTitle, setNewListTitle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeListIndex, setActiveListIndex] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [Descriptions, setDescriptions] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        async function FirstfetchDataAndSet() {
            try {
                const { todoData, listData } = await FirstfetchData();

                if (!todoData || !listData) {
                    // Handled the case where either todoData or listData is undefined
                    throw new Error('Data is not available');
                }

                const todos = todoData.records.map((todo) => {
                    const newTodo = {
                        id: todo.id,
                        title: todo.fields.Title,
                        listId: todo.fields.ListId,
                    }

                    return newTodo;
                });

                const lists = listData.records.map((list) => {
                    return {
                        id: list.id,
                        title: list.fields.ListName,
                        Descriptions: list.fields.Descriptions || [],
                        todos: todos.filter((todo) => todo.listId === list.id),
                    }
                });

                setTodoList([...lists, ...todoList]);
                setDescriptions(Array(todoList.length).fill(''));
                setIsLoading(false);
            } catch (err) {
                throw new Error(err.message);
            }
        }

        FirstfetchDataAndSet();
    }, []);

    const addTodo = async (newTodo) => {
        try {
            const completedDate = new Date();
            const completedDateISO = completedDate.toISOString();
            const newRecord = await FetchTodoItems(newTodo, isListVisible, todoList);
            setTodoList((prevTodoList) => {
                const updatedLists = [...prevTodoList];
                updatedLists[isListVisible].todos.push({
                    title: newTodo.title,
                    completedAt: completedDateISO,
                    id: newRecord.records[0].id,
                });

                const newPageNumber = Math.ceil(updatedLists[isListVisible].todos.length / itemsPerPage);
                setCurrentPage(newPageNumber);

                return updatedLists;
            });
        } catch (err) {
            console.log(err);
        }
    }

    const searchTodo = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

    const removeTodo = async (id) => {
        try {
            await RemoveTodoItems(id);
            setTodoList((prevTodoList) => {
                const updatedLists = prevTodoList.map((list) => {
                    return {
                        ...list,
                        todos: list.todos.filter((todo) => todo.id !== id),
                    };
                });
                const newPageNumber = Math.ceil(updatedLists[isListVisible].todos.length / itemsPerPage);
                setCurrentPage(newPageNumber);

                return updatedLists;
            });
        } catch (err) {
            console.log(err);
        }
    }

    const toggleFavorite = (id) => {
        const updatedTodos = todoList.map((list) => {
            return {
                ...list,
                todos: list.todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, isFavorite: !todo.isFavorite };
                    }
                    return todo;
                }),
            }
        });

        setTodoList(updatedTodos);
    }

    const addNewList = async (title) => {
        try {
            const newListData = await PostNewLIst(title);
            const listIds = newListData.records.map((record) => record.id);
            const newLists = listIds.map((id) => ({
                title,
                todos: [],
                id: id,
            }));
            setTodoList([...todoList, ...newLists]);
            setNewListTitle('');
            setIsFormVisible(false);
        } catch (err) {
            console.error(err);
        }
    }

    const closeAddModel = (event) => {
        setIsFormVisible(false);
    }

    const removeList = async (id) => {
        try {
            await RemoveListItem(id);
            setTodoList((prevTodoList) =>
                prevTodoList.filter((todolist) => todolist.id !== id)
            );
        } catch (err) {
            throw new Error(err.message);
        }
    }

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['background-element']}>
                    <div className={styles['first-child']}>
                        <SearchForm onSearch={searchTodo} />
                    </div>
                    <div className={styles['second-child']}>
                        {/* Your JSX rendering TodoContainer */}
                        <div className={styles['menu-elements']}>
                            {todoList.map((list, index) => (
                                <div
                                    key={list.id}
                                    className={styles['list-item']}
                                >
                                    <button
                                        className={styles['remove-list-button']}
                                        onClick={() => removeList(list.id)}
                                    >
                                        X
                                    </button>
                                    <button
                                        key={index}
                                        onClick={() => {
                                            const listIndex = todoList.findIndex(
                                                (item) => item.id === list.id
                                            );
                                            setIsListVisible(listIndex);
                                            setActiveListIndex(index);
                                            setAnimate(true);
                                        }}
                                        className={
                                            index === isListVisible
                                                ? styles['active-list']
                                                : ''
                                        }
                                    >
                                        {list.title}
                                    </button>
                                </div>
                            ))}
                            <button
                                className={styles['add-list']}
                                onClick={() => setIsFormVisible(true)}
                            >
                                AddList
                            </button>
                        </div>
                        <div
                            className={styles['model-container']}
                            style={{
                                display: isFormVisible ? 'flex' : 'none',
                            }}
                        >
                            {isFormVisible && (
                                <NewCustomList
                                    className={styles['model-card']}
                                    onSubmit={(title) => {
                                        addNewList(title);
                                        setIsFormVisible(false);
                                    }}
                                    title={newListTitle}
                                    setTitle={setNewListTitle}
                                    onClose={closeAddModel}
                                />
                            )}
                        </div>
                        <div>
                            <AddTodoForm
                                onAddtodo={addTodo}
                                todoList={
                                    isListVisible >= 0 &&
                                    todoList.length > 0
                                        ? todoList[isListVisible].todos
                                        : []
                                }
                            />
                            <TodoList
                                className={styles.TodoList}
                                todoList={
                                    isListVisible >= 0 &&
                                    todoList.length > 0
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
                                    isListVisible >= 0 &&
                                    todoList.length > 0
                                        ? todoList[isListVisible].id
                                        : undefined
                                }
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                            />
                            <div className={styles['pagination-container']}>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(
                                        (todoList[isListVisible] &&
                                            todoList[isListVisible].todos.length) /
                                        itemsPerPage
                                    )}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.videoWrapper}>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={styles.video}
                                >
                                    <source
                                        src="/images/drink_-_38048 (1080p).mp4"
                                        type="video/mp4"
                                    />
                                    Your browser doesn't support video!
                                </video>
                                <div className={styles['break-container']}>
                                    <a
                                        href="https://www.lumosity.com/train/turbo/odp/1/play"
                                        className={styles['break']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Lets Take A Break And Play!
                                    </a>
                                </div>
                            </div>

            <div className={styles['footer-container']}>
                <footer className={styles.footer}>
                    <p>© 2023 Todo Manangement APP BY </p>
                    <a
                        href="https://github.com/Manizha-khorram"
                        target="_blank"
                        rel="noreferrer"
                        title="Manizha"
                    >
                        <img
                            src="https://ca.slack-edge.com/T07EHJ738-U03G77AKPFY-1878db5f4c82-512"
                            alt="Manizha"
                        />
                    </a>
                    <p>Manizha Khorram</p>
                </footer>
            </div>
        </>
    );
}

export default TodoContainer;
