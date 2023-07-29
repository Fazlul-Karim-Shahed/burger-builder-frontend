import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, fetchIngredientFromLocal, fetchOrders } from '../Authentication/AuthFunctions'
import { CHECK_AUTH, FETCH_INGREDIENT, FETCH_ORDERS } from '../Redux/ActionType'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import Header from './Header/Header'


const mapStateToProps = state => {
  return {
    totalIngredient: state.totalIngredient,

  }
}
function MainComponent(props) {


  props.dispatch({
    type: CHECK_AUTH,
    value: checkAuth()
  })

  props.dispatch({
    type: FETCH_INGREDIENT,
    value: fetchIngredientFromLocal()
  })

  if (localStorage.getItem('token') != null) {
    fetchOrders()

      .then(data => {
        props.dispatch({
          type: FETCH_ORDERS,
          value: data
        })
      })

  }


  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default connect(mapStateToProps)(MainComponent)