import React, { Component } from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  console.log(state.selectedIngredient);
  return {
    totalIngredient: state.totalIngredient,
    selectedIngredient: state.selectedIngredient
  }
}
class Ingredient extends Component {


  // shouldComponentUpdate(){
  //   console.log(this.props.selectedIngredient);
  // }

  render() {
    let img = 'assets/images/'
    

    let image = this.props.selectedIngredient.map(item => {
      return (
        <img key={Math.random()} className='burger_img' src={`${img}${item}.png`} alt="" />
      )
    })

    return (
      <div className=''>
        {image}
      </div>
    )
  }
}


export default connect(mapStateToProps)(Ingredient)