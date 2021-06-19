import React, { Component } from 'react'
import Ingredient from '../Body/Ingredient'
import CardItem from './CardItem'
import { connect } from 'react-redux'
import {Alert} from 'reactstrap'
import Spinner from './Spinner'


const mapStateToprops = state => {
    return {
        stateArray: state.stateArray,
        price: state.price,
        itemprices: state.itemprices,
        authenticated : state.authenticated,
        spinner : state.spinner
    }
}

class Burger extends Component {

    state = {
        authenticated : this.props.authenticated
    }

    toggle = () => {
        this.setState({
            authenticated : !this.state.authenticated
        })
    }

    render() {

        let saladCount = 0;
        let meatCount = 0;
        let cheeseCount = 0;

        const add = event => {

            this.props.dispatch({
                type: "ADD_INGREDIENT",
                value: event.target.value
            })

            for (var i of this.props.stateArray) {
                if (i === "salad") ++saladCount;
                if (i === "meat") ++meatCount;
                if (i === "cheese") ++cheeseCount;
            }

            this.props.dispatch({
                type: "COUNT_INGREDIENT",
                value: {
                    salad: Math.abs(saladCount) ,
                    meat: Math.abs(meatCount) ,
                    cheese: Math.abs(cheeseCount) 
                }
            })


            const price = this.props.price + this.props.itemprices[event.target.value]

            this.props.dispatch({
                type: "UPDATE_PRICE",
                value: price
            })

        }

        const remove = event => {

            let n = this.props.stateArray.lastIndexOf(event.target.value)
            
            if (n !== -1) {
                this.props.stateArray.splice(n,1)
                const stateArray = this.props.stateArray
                this.props.dispatch({
                    type: "REMOVE_INGREDIENT",
                    value: stateArray
                })

                for (var i of this.props.stateArray) {
                    if (i === "salad") --saladCount;
                    if (i === "meat") --meatCount;
                    if (i === "cheese") --cheeseCount;
                }

                this.props.dispatch({
                    type: "COUNT_INGREDIENT",
                    value: {
                        salad: Math.abs(saladCount),
                        meat: Math.abs(meatCount),
                        cheese: Math.abs(cheeseCount)
                    }
                })

                const price = this.props.price - this.props.itemprices[event.target.value]

                this.props.dispatch({
                    type: "UPDATE_PRICE",
                    value: price
                })

            }
        }


        let ingredientLoader

        if (this.props.stateArray.length === 0) {
            ingredientLoader = <div className="text-center text-info p-1">Add Some Ingredients</div>
        }

        if (this.props.stateArray.length !== 0) {
            ingredientLoader = this.props.stateArray.map(item => {
                return <Ingredient type={item} />
            })
        }




        return (
            this.props.spinner ? <div><Spinner /></div> : <div>
                <div className="row py-4">
                    <div className="col-md-6 p-5">
                        <Ingredient type="top" />
                        {ingredientLoader}
                        <Ingredient type="bottom" />
                    </div>
                    <div className="col-md-6 my-5">
                        <CardItem ingredientLoader={ingredientLoader} add={event => add(event)} remove={event => remove(event)} />
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToprops)(Burger)