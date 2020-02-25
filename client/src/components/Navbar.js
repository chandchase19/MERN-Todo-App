import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'



export const Navbar = ({logout}) => {
    return (
        <div id="nav">
            <Link className="nav-item" to="/">Todos</Link>

            { localStorage.getItem('auth-id') ?
                (
                    <Link className="nav-item" onClick={logout} to="/login">Logout</Link>
                )
                :
                (
                    <Fragment>
                        <Link className="nav-item" to="/login">Login</Link>
                        <Link className="nav-item" to="/register">Register</Link>
                    </Fragment>
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)