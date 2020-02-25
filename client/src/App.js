import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux'
import Login from './components/Login'
import Register from './components/Register'
import store from './store'
import Todos from './components/Todos'
import Navbar from './components/Navbar'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className="app">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Todos}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
