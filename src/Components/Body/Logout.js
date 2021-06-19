import React from 'react'
import { matchPath, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToprops = state => {
    return{

    }
}

function Logout(props) {
    localStorage.removeItem("token")
    localStorage.removeItem("expireTime")
    props.dispatch({
        type: "LOGOUT"
    })

    return (
        <div>
            <Redirect to="/login" />
        </div>
    )
}

export default connect(mapStateToprops)(Logout)
