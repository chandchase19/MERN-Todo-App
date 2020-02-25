import {
    LOGIN,
    LOGOUT,
    ADD_AUTH_ERROR,
    CLEAR_USER_ERRORS
} from '../actions/types'

const intitalState = {
    authErrors: [],
    authId: null,
    userName: 'guest'
}

export default function(state = intitalState, action) {
    const { type, payload } = action

    switch(type) {
        case LOGIN:
            return {
                ...state,
                ...payload,
                authErrors: [],
                loggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                authId: null
            }
        case ADD_AUTH_ERROR:
            return {
                ...state,
                authErrors: [...payload]
            }
        case CLEAR_USER_ERRORS:
            return {
                ...state,
                authErrors: []
            }
        default:
            return state
    }
}