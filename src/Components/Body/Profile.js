import jwtDecode from 'jwt-decode'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const Profile = (props) => {
  const decoded = jwtDecode(localStorage.getItem('token'))

  let time = new Date(new Date(decoded.exp * 1000)).toLocaleTimeString()
  return (
    <div className=' mx-md-5 my-3 px-5'>
      <div className="row">
        <div className="col-4 fw-bolder">User info: </div>
        <div className="col-8">
          <p>User id: {decoded._id}</p>
          <p>Name: {decoded.name}</p>
          <p>Email: {decoded.email}</p>
          <p>Role: {decoded.role}</p>
          <p>Session expire at: {time}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-4  fw-bolder">Others</div>
        <div className="col-8">
          <Link to='/orders'>See Order History</Link>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)