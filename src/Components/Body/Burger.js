import React from 'react'
import { connect } from 'react-redux'
import './BodyStyles/Burger.css'
import Ingredient from './Ingredient'
import IngredientCard from './IngredientCard'


const mapStateToProps = (state) => ({})

const Burger = (props) => {


  let bottom = 'assets/images/bottom.png'
  let top = 'assets/images/top.png'

  return (
    <div className='container'>
      <div className="row mt-lg-5 mt-2">
        <div className="col-lg-6 burger_left_border mb-3">
          <div className='text-center'>
            <img className='burger_img' src={top} alt="" />
            <Ingredient />
            <img className='burger_img' src={bottom} alt="" />
          </div>
        </div>
        <div className="col-lg-6">
          <IngredientCard />
        </div>
      </div>
    </div>
  )
}



export default connect(mapStateToProps)(Burger)