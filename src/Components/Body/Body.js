import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../Body/Home'
import About from '../Body/About'
import Burger from '../Body/Burger'
import Contact from '../Body/Contact'
import ProceedForm from './ProceedForm'
import Cart from './Cart'
import LogIn from './LogIn'
import { connect } from 'react-redux'
import LogOut from './Logout'

const mapStateToprops = state => {
    return {
        authenticated: state.authenticated
    }
}

function Body(props) {

    let router =  <div>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={ProceedForm} />
        <Route path="/cart" component={Cart} />
        <Route path="/burger" component={Burger} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        
        {props.authenticated ? <Route path="/logout" component={LogOut} /> : <Route path="/login" component={LogIn} />}

    </div>

    return (
        <div>
            {router}
        </div>
    )
}

export default connect(mapStateToprops)(Body)