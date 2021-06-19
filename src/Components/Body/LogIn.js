import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Spinner from './Spinner'
import './BodyCss/LogIn.css'
import jwtDecode from 'jwt-decode'


const mapStateToprops = state => {
    return {
        authenticated: state.authenticated,
        spinner: state.spinner
    }
}

class LogIn extends Component {

    state = {
        switchMode: 'Sign In',
        errorMessage: "",
    }

    componentDidUpdate() {

    }


    render() {

        const switchModeHandler = () => {
            this.setState({
                switchMode: this.state.switchMode === "Sign up" ? "Sign In" : "Sign up"
            })
        }

        return (
            <div className="my-5 all">
                <div className="">
                    <div className="">
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                confirmPassword: "",
                                firstName: "",
                                lastName: ""

                            }}

                            validate={
                                values => {
                                    const errors = {};



                                    if (!values.email) {
                                        errors.email = "Required"
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                        errors.email = "Invalid email address"
                                    }

                                    if (!values.password) {
                                        errors.password = "Required";
                                    } else if (values.password.length <= 4) {
                                        errors.password = "Password length mush be greater than 7"
                                    }

                                    if (this.state.switchMode === "Sign up") {

                                        if (!values.firstName) {
                                            errors.firstName = "Required"
                                        }
                                        if (!values.lastName) {
                                            errors.lastName = "Required"
                                        }

                                        if (!values.confirmPassword) {
                                            errors.confirmPassword = "Required"
                                        } else if (values.password !== values.confirmPassword) {
                                            errors.confirmPassword = "Doesn't match"
                                        }
                                    }

                                    return errors
                                }
                            }

                            onSubmit={
                                (values) => {


                                    if (this.state.switchMode === "Sign up") {
                                        fetch('https://myburgerbuilderapp.herokuapp.com/signup', {
                                            method: "post",
                                            body: JSON.stringify({
                                                firstName: values.firstName,
                                                lastName: values.lastName,
                                                email: values.email,
                                                password: values.password

                                            })
                                        }).then(res => {

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
                                            }

                                            return res.json()
                                        }).then(data => {

                                            if (data.err) {
                                                console.log(data.err)
                                                throw data.err
                                            }

                                            const decoded = jwtDecode(data.token)
                                            localStorage.setItem("token", data.token)
                                            localStorage.setItem("expireTime", new Date(decoded.exp*1000))

                                            this.props.dispatch({
                                                type: "fastCheck"
                                            })
                                            this.props.history.push("/burger")


                                        }).catch(err => {
                                            this.setState({
                                                errorMessage: err
                                            })
                                            
                                        })
                                    }
                                    else if (this.state.switchMode === "Sign In") {
                                        fetch("https://myburgerbuilderapp.herokuapp.com/signin", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                email: values.email,
                                                password: values.password

                                            })
                                        }).then(res => {

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
                                            }


                                            return res.json()
                                        }).then(data => {

                                            if (data.err) {
                                                console.log(data.err)
                                                throw data.err
                                            }

                                            const decoded = jwtDecode(data.token)

                                            localStorage.setItem("token", data.token)
                                            localStorage.setItem("expireTime", new Date(decoded.exp*1000))
                                            this.props.dispatch({
                                                type: "fastCheck"
                                            })

                                            this.props.history.push("/burger")

                                        }).catch(err => {
                                            this.setState({
                                                errorMessage: err
                                            })
                                        })

                                    }

                                }

                            }
                        >

                            {
                                ({ handleChange, handleSubmit, values, errors }) => this.props.spinner ? <div><Spinner /></div> : <div>
                                    <div className="text-center pt-4">
                                        <button onClick={switchModeHandler} className="btn text-white btn-outline-dark">Switch to {this.state.switchMode === "Sign In" ? "Sign up" : "Sign In"}</button>
                                    </div>
                                    <form className="p-4" onSubmit={handleSubmit} action="">
                                        <div>
                                            {
                                                this.state.switchMode === "Sign up" ? <div>
                                                    <input type="text"
                                                        name="firstName"
                                                        value={values.firstName}
                                                        onChange={handleChange}
                                                        className="form-control my-2"
                                                        placeholder="First name"
                                                    />
                                                    <span className="text-white">{errors.firstName}</span>
                                                    <input type="text"
                                                        name="lastName"
                                                        value={values.lastName}
                                                        onChange={handleChange}
                                                        className="form-control my-2"
                                                        placeholder="Last name"
                                                    />
                                                    <span className="text-white">{errors.lastName}</span>
                                                </div> : <div></div>
                                            }
                                            <input type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                className="form-control my-2"
                                                placeholder="Enter email"
                                            />
                                            <span className="text-white">{errors.email}</span>
                                            <input type=""
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                className="form-control my-2"
                                                placeholder="Enter password"
                                            />
                                            <span className="text-white">{errors.password}</span>
                                            {
                                                this.state.switchMode === "Sign up" ? <div>
                                                    <input type="password"
                                                        name="confirmPassword"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                        className="form-control my-2"
                                                        placeholder="Confirm Password"
                                                    />
                                                    <span className="text-white">{errors.confirmPassword}</span>
                                                </div> : <div></div>
                                            }
                                            {this.state.errorMessage === "" ? <div></div> :
                                                <div className="text-center"><div className="d-inline-block loginWarning">{this.state.errorMessage}</div></div>}
                                            <button type="submit" className="btn btn-primary">{this.state.switchMode === "Sign up" ? "Sign up" : "Sign In"}</button>
                                        </div>
                                    </form>

                                </div>
                            }
                        </Formik>
                    </div>
                </div>

            </div>
        )
    }
}


export default connect(mapStateToprops)(LogIn)
