import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchIngredientFromLocal, fetchOrders } from '../../Authentication/AuthFunctions'
import { FETCH_INGREDIENT, FETCH_ORDERS } from '../../Redux/ActionType'
import jwtDecode from 'jwt-decode'


const mapStateToProps = (state) => {
  return {
    price: state.price,
    selectedIngredient: state.selectedIngredient,
    authenticated: state.authenticated
  }
}

class ProceedForm extends Component {

  constructor(props) {
    super(props)
    const decoded = jwtDecode(localStorage.getItem('token'))
    this.state = {
      name: decoded.name,
      email: decoded.email,
      mobile: '',
      address: '',
      paymentMethod: 'bkash'
    }
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitHandler = (e) => {

    if (this.props.authenticated) {
      localStorage.removeItem('selectedIngredient')
      const decoded = jwtDecode(localStorage.getItem('token'))
      console.log(decoded);
      axios.post(process.env.REACT_APP_BACKEND_URL + `/order/`, {
        userId: decoded._id,
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        selectedIngredient: this.props.selectedIngredient,
        price: this.props.price,
        address: this.state.address,
        paymentMethod: this.state.paymentMethod,
        time: new Date().toLocaleString()

      }).then(data => {
        console.log(data.data);
        fetchOrders().then(data => {
          this.props.dispatch({
            type: FETCH_ORDERS,
            value: data
          })
        })

        this.props.dispatch({
          type: FETCH_INGREDIENT,
          value: fetchIngredientFromLocal()
        })
      })
        .catch(err => console.log(err))
    }

    else alert('Authentication failed')


    this.setState({
      name: '',
      email: '',
      mobile: '',
      address: '',
      paymentMethod: ''
    })

    e.preventDefault()

  }



  render() {
    return (
      <div className='w-75 m-auto border p-3 bg-light my-lg-5 rounded'>
        <form action="">
          <div>
            <label className=' form-label' htmlFor="name">Name: </label>
            <input className='form-control' onChange={(e) => this.onChangeHandler(e)} value={this.state.name} type="text" name="name" id="" />
          </div>
          <div>
            <label className=' form-label' htmlFor="email">Email: </label>
            <input className=' form-control' onChange={(e) => this.onChangeHandler(e)} value={this.state.email} type="email" name="email" id="" />
          </div>
          <div>
            <label className=' form-label' htmlFor="mobile">Mobile</label>
            <input className=' form-control' onChange={(e) => this.onChangeHandler(e)} value={this.state.mobile} type="text" name="mobile" id="" />
          </div>
          <div>
            <label className=' form-label' htmlFor="address">Address</label>
            <input className=' form-control' onChange={(e) => this.onChangeHandler(e)} value={this.state.address} type="text" name="address" id="" />
          </div>
          <div>
            <label className=' form-label' htmlFor="paymentMethod"></label>
            <select className='form-select' onChange={(e) => this.onChangeHandler(e)} name="paymentMethod" id="">
              <option value="bkash">Bkash</option>
              <option value="nogod">Nogod</option>
              <option value="cashOn">CashOn</option>
            </select>
          </div>
          <button onClick={(e) => this.onSubmitHandler(e)} className='btn btn-outline-primary w-100 mt-4' type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


export default connect(mapStateToProps)(ProceedForm)