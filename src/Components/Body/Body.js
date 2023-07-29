import React from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router'
import AuthenticationForm from '../../Authentication/AuthenticationForm'
import Logout from '../../Authentication/Logout'
import About from './About'
import Burger from './Burger'
import Contact from './Contact'
import Orders from './Orders'
import ProceedForm from './ProceedForm'
import Profile from './Profile'

const mapStateToProps = (state) => ({
  authenticated: state.authenticated
})

const BurgerBuilder = (props) => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Burger />} />
        <Route path='/burger' element={<Burger />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/proceed-form' element={<ProceedForm />} />
        <Route path='/login' element={<AuthenticationForm />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<h1>Sorry page not found</h1>} />
        {props.authenticated ? <Route path='/profile' element={<Profile />} /> : ''}
        {props.authenticated ? <Route path='/orders' element={<Orders />} /> : ''}
      </Routes>
    </div>
  )
}





export default connect(mapStateToProps)(BurgerBuilder)