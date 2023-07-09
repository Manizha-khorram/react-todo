import React from 'react'

const TodoListItem = ({ todo }) => {

    //we can use (title) prop here as well to deal with titles, no need for todo prop!?
   
    return (
        <div>
            <li>{todo.title}</li>
        </div>
    )
}

export default TodoListItem
