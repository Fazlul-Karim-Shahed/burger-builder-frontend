import React from 'react'
import { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
   
} from 'reactstrap';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToprops = state => {
    return{
        authenticated: state.authenticated
    }
}
 
class Header extends Component {

    state = {
        navOpen : false
    }

    

    render() {

        const toggle = () => {
            this.setState({
                navOpen: !this.state.navOpen
            })
        }
        // here //////////////////////////////////////////// =>
        let menu = <Nav className="ml-auto" navbar>
            {/* <NavItem className="mx-2 my-2">
                <Link className="text-white" to="/">Home</Link>
            </NavItem> */}
            <NavItem className="mx-2 my-2">
                <Link className="text-white" to="/burger">Burger</Link>
            </NavItem>
            <NavItem className="mx-2 my-2">
                <Link className="text-white" to="/cart">Cart</Link>
            </NavItem>
            <NavItem className="mx-2 my-2">
                <Link className="text-white" to="/about">About</Link>
            </NavItem>
            <NavItem className="mx-2 my-2">
                <Link className="text-white" to="/contact">Contact us</Link>
            </NavItem>
            {this.props.authenticated ? <NavItem className="mx-2 my-2">
                <Link className="text-white" to="/logout">Log out</Link>
            </NavItem> : <NavItem className="mx-2 my-2">
                <Link className="text-white" to="/login">Log In</Link>
            </NavItem>}
        </Nav>

        return (
            <div >
                <Navbar className="px-5 text-white" light style={{ backgroundColor:"#D70F64"}} expand="md">
                    <NavbarBrand href="/burger">
                        <img src="assets/logo.png" height="60px" width="90px" alt="logo"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={this.state.navOpen} navbar>
                        {menu}
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default connect(mapStateToprops)(Header)
