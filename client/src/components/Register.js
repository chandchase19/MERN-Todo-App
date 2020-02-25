import React, {Fragment, useState} from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { register } from '../actions/auth'
import { addAuthErrors } from '../actions/auth'

const Register = ({ auth, register, addAuthErrors }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })

    const { email, password, password2} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            addAuthErrors(['Passwords do not match'])
            console.log('pass no match')
        } else {
            register(email, password)
        }
    }

    if (localStorage.getItem('auth-id')) {
        return <Redirect to='/' />
    }

    return (

        <div className="auth-form">

        <h1>Register</ h1>

        <p>*Authentication is not secure.<br />Please use dummy password</p>

        <form onSubmit={e => onSubmit(e)}>
            <input
                type="email"
                placeholder="Email..."
                name="email"
                value={email}
                onChange={e => onChange(e)}
                /> <br />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                /> <br />
            <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
            /> <br />
            <input
                className="app-btn"
                type="submit"
                value="Register"
            />
        </form>
        
        {
            auth.authErrors.map(msg => (
                <p className="user-error">
                    {msg}
                </p>
            ))
        }
        <p>Have an account? <Link className="link" to="/login">Login</Link></p>
        
    </div>
    )    
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { register, addAuthErrors })(Register)