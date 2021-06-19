import React, { Component } from 'react'
import Body from './Body/Body'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { connect } from 'react-redux'

const mapStateToprops = state => {
    return {

    }
}

class MainComponent extends Component {

    componentDidMount() {

        
        let token = localStorage.getItem("token")
        let localId = localStorage.getItem("userId")
        let logTime = localStorage.getItem("logTime")
        let expireTime = localStorage.getItem("expireTime")
        this.props.dispatch({
            type: "CheckAuth",
            authenticated: new Date() < new Date(expireTime) ? true : false
        })

    }

    render() {
        return (
            <div >
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}

export default connect(mapStateToprops)(MainComponent)
