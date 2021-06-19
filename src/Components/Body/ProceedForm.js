import React from 'react'
import { LocalForm, Errors, Control } from 'react-redux-form'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Col, Alert } from 'reactstrap';
import Spinner from './Spinner'
import './BodyCss/proceedForm.css'
import jwtDecode from 'jwt-decode';

const mapDispatchToProps = state => {
    return {
        price : state.price,
        ingredientCount : state.ingredientCount,
        spinner : state.spinner
    }
}

const required = value => value && value.length

class ProceedForm extends React.Component {

    state={
        alert : "",
        alertOpen : true
    }

    toggle = () => {
        this.setState({alertOpen : !this.state.alertOpen})
    }

    submit = values => {
        // console.log(values)

        const decoded = jwtDecode(localStorage.getItem("token"))
        fetch(`https://myburgerbuilderapp.herokuapp.com/cart`, {
            method : 'POST',
            body: JSON.stringify({
                userId: decoded._id ,
                name : decoded.firstName + " " + decoded.lastName,
                email: decoded.email,
                orderTime: new Date().toLocaleString(),
                items: this.props.ingredientCount,
                price: this.props.price,
                addressDetail: values

            })
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.dispatch({
                        type: "SPINNER",
                        value: true
                    })
                    setTimeout(() => {
                        this.props.dispatch({
                            type: "SPINNER",
                            value: false
                        })

                    }, 1000)

                    this.setState({
                        alert : "Successfully placed order"
                    })
                    this.props.history.push("/cart")

                }
                else {
                    
                    this.props.dispatch({
                        type: "SPINNER",
                        value: true
                    })
                    setTimeout(() => {
                        this.props.dispatch({
                            type: "SPINNER",
                            value: false
                        })

                    }, 3000)

                    this.setState({
                        alert: "Something went wrong"
                    })

                }
                // return res.json()
            })
            // .then(data => {})
            
                
        

    }

    render() {

       const decoded = jwtDecode(localStorage.getItem("token"))
        return (
            this.props.spinner ? <div><Spinner /></div> : <div className="total my-5">
                {this.state.alert ? <Alert className="alert alert-success" isOpen={this.state.alertOpen} toggle={this.toggle}>
                        {this.state.alert}
                </Alert> : <div></div>}
                <LocalForm onSubmit={values => this.submit(values)} className="form">
                    <FormGroup row>

                        <Col md={12}>
                            <Control.text
                                model=".firstName"
                                name="firstName"
                                value={decoded.firstName}
                                
                                className="form-control"
                                 />
                                
                                
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={12}>
                            <Control.text
                                model=".lastName"
                                name="lastName"
                                value={decoded.lastName}
                                className="form-control"
                                  />
                            
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={12}>
                            <Control.text
                                model=".email"
                                name="email"
                                value={decoded.email}
                                className="form-control"
                            />

                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        
                        <Col md={12}>
                            <Control.textarea
                                model=".address"
                                name="address"
                                placeholder="Address"
                                className="form-control"
                                validators={{
                                    required
                                }}  />
                            <Errors
                                className="text-danger"
                                model=".address"
                                messages={{
                                    required: "Required"
                                }} />
                        </Col>
                    </FormGroup>
                    <FormGroup >
                        <div className="text-center">
                            <button className="btn btn-primary m-1" type="submit">Confirm order</button>
                            <Link to="/burger" className="btn btn-danger m-1" type="cancel">Cancel</Link>

                        </div>
                    </FormGroup>

                </LocalForm>

            </div>
        )
    }
}

export default connect(mapDispatchToProps)(ProceedForm)
