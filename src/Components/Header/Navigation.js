import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import './HeaderStyles/Navigation.css'




const mapStateToProps = (state) => ({
  authenticated: state.authenticated
})

class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }


  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }



  render() {
    return (
      <div className=''>
        <Navbar className='px-lg-5 py-0' style={{ backgroundColor: '#D70F64' }} expand='md'>
          <NavbarBrand className='m-0 p-0' href='/'><img src={Logo} width='70px' alt="" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} className='me-2' />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ms-auto' navbar>
              <NavItem >
                <Link className='text-white mx-md-2 text-decoration-none' to='/burger'>Burger</Link>
              </NavItem>
              {
                this.props.authenticated ? <div className='d-flex navigation_auth_link'>
                  <NavItem className=''>
                    <Link className='text-white mx-md-2 text-decoration-none' to='/profile'>Profile</Link>
                  </NavItem>
                  <NavItem>
                    <Link className='text-white mx-md-2 text-decoration-none' to='/logout'>Logout</Link>
                  </NavItem>
                </div> :
                  <div>
                    <NavItem>
                      <Link className='text-white mx-md-2 text-decoration-none' to='/login'>Login</Link>
                    </NavItem>
                  </div>
              }
              <NavItem>
                <Link className='text-white mx-md-2 text-decoration-none' to='/contact'>Contact</Link>
              </NavItem>
              <NavItem>
                <Link className='text-white mx-md-2 text-decoration-none' to='/about'>About</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}



export default connect(mapStateToProps)(Navigation)
