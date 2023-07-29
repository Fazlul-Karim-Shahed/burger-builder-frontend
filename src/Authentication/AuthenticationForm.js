
import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CHECK_AUTH } from '../Redux/ActionType'
import { checkAuth, login } from './AuthFunctions'



const mapStateToProps = state => {
    return {

    }
}


class AuthenticationForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            mode: 'signin',
            message: ''
        }
    }


    render() {

        let signupUrl = process.env.REACT_APP_BACKEND_URL + `/user/signup`
        let signinUrl = process.env.REACT_APP_BACKEND_URL + `/user/signin`

        

        const errMessage = message => {
            this.setState({
                message: message
            })
        }
        const onChangeHandler = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        const onSubmitHandler = (e) => {

            console.log(this.state);

            axios.post(this.state.mode === 'signin' ? signinUrl : signupUrl, this.state.mode === 'signin' ? {
                email: this.state.email,
                password: this.state.password,
            } : {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }).then(data => {

                if (!data.data.error) {
                    errMessage(data.data.message)
                    login(data.data);
                }
                else throw data.data.message;
                this.props.dispatch({ type: CHECK_AUTH, value: checkAuth() })
                if (checkAuth()) {
                    window.location.replace("/");

                }

            })
                .catch((err) => {
                    errMessage(err)
                })


            this.setState({
                email: '',
                password: '',
            })


            e.preventDefault()
        }

        const changeMode = () => {
            console.log(this.state);
            this.setState({
                mode: this.state.mode === 'signin' ? 'signup' : 'signin'
            })
        }


        return (
            <div className=' w-75 m-auto border p-3 bg-light my-5 rounded'>
                <button onClick={changeMode} className='btn btn-primary mb-3'>Switch to {this.state.mode === 'signup' ? 'signin' : 'signup'}</button>
                <form action="">
                    {this.state.mode === 'signup' ? (
                        <div>
                            <label className=' form-label' htmlFor="name">Name: </label>
                            <input className=' form-control' onChange={(e) => onChangeHandler(e)} value={this.state.name} type="text" name="name" />
                        </div>
                    ) : <div></div>}
                    <div>
                        <label className=' form-label' htmlFor="email">Email: </label>
                        <input className=' form-control' onChange={(e) => onChangeHandler(e)} value={this.state.email} type="email" name="email" />
                    </div>
                    <div>
                        <label className=' form-label' htmlFor="password">Password</label>
                        <input className=' form-control' onChange={(e) => onChangeHandler(e)} value={this.state.password} type="text" name="password" />
                    </div>
                    <div className='text-danger text-center'>{this.state.message}</div>
                    <button onClick={(e) => onSubmitHandler(e)} className='btn btn-outline-primary w-100 mt-4' type="submit">{this.state.mode === 'signin' ? 'Sign in' : 'Sign up'}</button>
                </form>
            </div>
        )

    }
}

export default connect(mapStateToProps)(AuthenticationForm)