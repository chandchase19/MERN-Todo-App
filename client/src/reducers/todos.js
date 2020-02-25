import {
    ADD_TODOS_TO_STATE,
    SET_IS_EDITING,
    SET_IS_DELETING ,
    SET_CURRENT_EDITING_INDEX,
    DELETE_TODO,
    EDIT_TODO,
    ADD_TODO,
    CLEAR_EDIT_METHOD,
    CLEAR_TODOS
} from '../actions/types'

const initialState = {
    userTodos: [],
    editMethod: '',
    currentlyEditingIndex: null,
    isEditing: false
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case ADD_TODOS_TO_STATE:
            return {
                ...state,
                userTodos: payload
            }
        case CLEAR_EDIT_METHOD:
            return {
                ...state,
                
                editMethod: '',
                isEditing: false,
                currentlyEditingIndex: null
            }
        case SET_IS_EDITING:
            return {
                ...state,
                editMethod: 'edit',
                isEditing: false,
                currentlyEditingIndex: null
            }
        case SET_IS_DELETING:
            return {
                ...state,
                editMethod: 'delete'
            }
        case SET_CURRENT_EDITING_INDEX:
            return {
                ...state,
                currentlyEditingIndex: payload,
                isEditing: true
            }
        case DELETE_TODO:
            return {
                ...state,
                userTodos: [...state.userTodos.slice(0, payload), ...state.userTodos.slice(payload + 1, state.userTodos.length)]
            }
        case EDIT_TODO:
            return {
                ...state,
                userTodos: [...state.userTodos.slice(0, payload.index), payload.newTodo, ...state.userTodos.slice(payload.index + 1, state.userTodos.length)] 
            }
        case ADD_TODO:
            return {
                ...state,
                userTodos: [payload, ...state.userTodos] 
            }
        case CLEAR_TODOS:
            return {
                ...initialState
            }
        default:
            return state
    }
}