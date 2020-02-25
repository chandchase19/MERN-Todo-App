import React, {Fragment, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addTodo, getTodos, clickedTodoHandler, setEditingToDelete, setEditingToEdit, editTodo, clearEditMethod } from '../actions/todos'

export const Todos = ({ todos, addTodo, getTodos, clickedTodoHandler, setEditingToDelete, setEditingToEdit, clearEditMethod, editTodo}) => {
    useEffect(() => {
        getTodos()
    }, [])

    const [formData, setFormData] = useState({
        todoTitle: '',
        todoMsg: ''
    })

    const { todoTitle, todoMsg} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        setFormData({todoTitle: '', todoMsg: ''})
        if(!todos.isEditing) {
            addTodo(todoTitle, todoMsg)
        } else {
            editTodo(todos.userTodos[todos.currentlyEditingIndex].todoId, todoTitle, todoMsg, todos.currentlyEditingIndex)
        }
    }

    const onTodoClick = (todoId, editMethod, index) => {
        if(editMethod === 'edit'){
            console.log('setting inputs')
            setFormData({todoTitle: todos.userTodos[index].title, todoMsg: todos.userTodos[index].msg})
        }
        clickedTodoHandler(todoId, editMethod, index)
    }

    const cancelEditHandler = () => {
        if(todos.isEditing){
            setFormData({todoTitle: '', todoMsg: ''})
        }
        clearEditMethod()
    }

    return (
        <div id="todo-page" className={'app-' + todos.editMethod}>
            <h1>Todos</h1>
            { localStorage.getItem('auth-id') ?
                (
                    <Fragment>
                        <form id='todo-form' onSubmit={e => onSubmit(e)}>
                            <input
                                type="text"
                                placeholder="Todo Title"
                                name="todoTitle"
                                value={todoTitle}
                                onChange={e => onChange(e)}
                                required
                                /> <br />
                            <input 
                                type="text"
                                placeholder="Your todo..."
                                name="todoMsg"
                                value={todoMsg}
                                required
                                onChange={e => onChange(e)}
                                /> <br />
                            {(todos.editMethod === '' || todos.isEditing) && 
                                (
                                    <input
                                    className={!todos.isEditing ? "app-btn" : "app-btn editing-btn"}
                                    type="submit"
                                    value={!todos.isEditing ? "Add Todo" : "Update todo"}
                                    />
                                )
                            }
                        </form>

                        { todos.editMethod === '' &&
                            (
                                <Fragment>
                                    <button className="app-btn editing-btn" onClick={() => setEditingToEdit()}>Edit Todo</button>
                                    <button className="app-btn delete-btn" onClick={() => setEditingToDelete()}>Delete Todo</button>
                                </Fragment>
                            )
                        }

                        { todos.editMethod === 'edit' &&
                            (
                                <Fragment>
                                        { !todos.isEditing &&
                                            (
                                                <p className="user-msg msg-green">Click to edit a todo</p>  
                                            )
                                        }
                                        <button className="app-btn" onClick={() => cancelEditHandler()}>Cancel Edit</button>
                                </Fragment>
                            )
                        }
                        

                        { todos.editMethod === 'delete' &&
                            (   
                                <Fragment>
                                    <p className="user-msg msg-red">Click to delete a todo</p>
                                    <button className="app-btn" onClick={() => clearEditMethod()}>Cancel Delete</button>
                                </Fragment>
                            )
                        }
                        
                        <br/>

                        {todos.userTodos.map((todo, index) => (
                            <button onClick={() => onTodoClick(todo.todoId, todos.editMethod, index)} className={'todo'+ ' ' + (todos.currentlyEditingIndex === index && 'todo-selected')}>
                                <span className='todo-title'>{todo.title} </span> <span className='todo-msg'>- {todo.msg}</span>
                            </button>
                        ))}

                    </Fragment>
                )
                :
                (
                    <Fragment>
                        <p>You are not logged in.<Link className="link" to="/login">Sign in</Link>, or <Link className="link" to="/register">register</Link>, to create todos</p>
                    </Fragment>
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    todos: state.todos
})

export default connect(mapStateToProps, { addTodo, getTodos, clickedTodoHandler, setEditingToDelete, setEditingToEdit, clearEditMethod, editTodo})(Todos)