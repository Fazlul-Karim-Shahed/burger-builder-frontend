import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router'
import { CHECK_AUTH } from '../Redux/ActionType'
import { checkAuth } from './AuthFunctions'


const mapStateToProps = (state) => {

}


const Logout = (props) => {

  localStorage.clear()
  props.dispatch({
    type: CHECK_AUTH,
    value: checkAuth()
  })


  return (
    <Navigate to="/login" replace />
  )
}




export default connect(mapStateToProps)(Logout)