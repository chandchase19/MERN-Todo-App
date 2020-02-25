import axios from 'axios'

import {
    LOGIN,
    LOGOUT,
    ADD_AUTH_ERROR,
    CLEAR_USER_ERRORS
} from './types'

import { clearTodos } from './todos'

export const login = (email, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('/api/users/login', body, config)

        console.log('login success')
        console.log(res.data)

        localStorage.setItem('auth-id', res.data.authId)

        dispatch({
            type: LOGIN,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ADD_AUTH_ERROR,
            payload: err.response.data.errors
        })
        console.log(err.response.data.errors)
        console.log('login error')
    }
}

export const logout = () => async dispatch => {
    console.log('logging out')
    localStorage.removeItem('auth-id')

    dispatch(clearTodos())

    dispatch({
        type: LOGOUT
    })
}

export const addAuthErrors = (errors) => async dispatch => {
    dispatch({
        type: ADD_AUTH_ERROR,
        payload: errors
    })
}

export const register = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('/api/users/register', body, config)

        console.log('register success')
        console.log(res.data)

        localStorage.setItem('auth-id', res.data.authId)

        dispatch({
            type: LOGIN,
            payload: res.data
        })

    } catch (err) {
        console.log('register fail')
        console.log('hi', err.response.data.errors) 
        dispatch({
            type: ADD_AUTH_ERROR,
            payload:  err.response.data.errors
        })
    }

}

export const checkId = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const localId = localStorage.getItem('auth-id')

    const body = JSON.stringify({userId: localId})

    try {
        const res = await axios.post('/api/users/id', body, config)

        console.log(localId)
        
        if(res.data.localId) {
            return true
        } else {
            dispatch({
                type: LOGOUT
            })
            return false
        }

    } catch (err) {
        console.log(err)
    }

}

export const clearUserErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_USER_ERRORS
    })

}