import axios from 'axios'

import {
    ADD_TODOS_TO_STATE,
    SET_IS_EDITING,
    SET_IS_DELETING,
    SET_CURRENT_EDITING_INDEX,
    DELETE_TODO,
    EDIT_TODO,
    ADD_TODO,
    CLEAR_EDIT_METHOD,
    CLEAR_TODOS
} from './types'

export const clickedTodoHandler = (todoId, editMethod, index) => async dispatch => {
    console.log(todoId)
    console.log(editMethod)
    if(editMethod === 'delete') {
        dispatch(deleteTodo(todoId, index))
    }

    if(editMethod === 'edit') {
        dispatch({
            type: SET_CURRENT_EDITING_INDEX,
            payload: index
        })
    }
}


export const editTodo = (todoId, todoTitle, todoMsg, index) => async dispatch => {
   
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const userId = localStorage.getItem('auth-id')

    const body = JSON.stringify({todoId, todoTitle, todoMsg})

    try {
        console.log(body)
        const res = await axios.post('/api/todos/update', body, config)
        
        const payload = {
            index,
            newTodo: {
                title: todoTitle,
                msg: todoMsg,
                todoId
            }
        }

        console.log(payload)
        dispatch({
            type: EDIT_TODO,
            payload
        })

        dispatch({
            type: CLEAR_EDIT_METHOD
        })

        console.log('success')
        console.log(res)

    } catch (err) {
        console.log(err.message)
    }
}

const deleteTodo = (todoId, index) => async dispatch => {
    console.log('this is working')
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // const userId = localStorage.getItem('auth-id')

    const body = JSON.stringify({todoId})
    // const body = JSON.stringify({userId, title, msg})

    try {
        //delete
        const res = await axios.post('/api/todos/remove', body, config)
 
        console.log('success')
        console.log(res)

        //123
        dispatch({
            type: DELETE_TODO,
            payload: index
        })

        dispatch({
            type: CLEAR_EDIT_METHOD
        })

    } catch (err) {
        console.log(err.message)
    }
}

export const addTodo = (title, msg) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const userId = localStorage.getItem('auth-id')

    const body = JSON.stringify({userId, title, msg})

    try {        
        
        const res = await axios.post('/api/todos/', body, config)
        
        dispatch({
            type: ADD_TODO,
            payload: {
                title,
                msg,
                todoId: res.data.todoId
            }
        })
        console.log(res.data.todoId)
        console.log('success')
    } catch (err) {
        console.log(err.message)
    }
}


export const getTodos = () => async dispatch => {
   
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const userId = localStorage.getItem('auth-id')

    const body = JSON.stringify({userId})

    try {
        const res = await axios.post('/api/todos/all', body, config)

        console.log(res.data)

        dispatch({
            type: ADD_TODOS_TO_STATE,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message)
    }
}
export const setEditingToDelete = () => async dispatch => {
    dispatch({
        type: SET_IS_DELETING
    })
}

export const setEditingToEdit = () => async dispatch => {
    dispatch({
        type: SET_IS_EDITING
    })
}


export const clearEditMethod = () => async dispatch => {
    dispatch({
        type: CLEAR_EDIT_METHOD
    })
}

export const clearTodos = () => async dispatch => {
    dispatch({
        type: CLEAR_TODOS
    })
}