import React from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import { addIngredientToLocal, fetchIngredientFromLocal, removeIngredientToLocal } from '../../Authentication/AuthFunctions'
import { ADD_INGREDIENT, CHANGE_ORDER_SUMMERY_MODAL, FETCH_INGREDIENT, REMOVE_INGREDIENT } from '../../Redux/ActionType'
import OrderSummery from './OrderSummery'



const mapStateToProps = (state) => ({
    totalIngredient: state.totalIngredient,
    selectedIngredient: state.selectedIngredient
})

const IngredientCard = (props) => {

    const addIngredient = item => {
        props.dispatch({
            type: ADD_INGREDIENT,
            value: item
        })

        addIngredientToLocal(item)
        props.dispatch({
            type: FETCH_INGREDIENT,
            value: fetchIngredientFromLocal()
        })

    }

    const removeIngredient = item => {
        props.dispatch({
            type: REMOVE_INGREDIENT,
            value: item
        })
        removeIngredientToLocal(item)
        props.dispatch({
            type: FETCH_INGREDIENT,
            value: fetchIngredientFromLocal()
        })
    }

    let ingredientName = props.totalIngredient.map(item => {

        let count
        count = [...props.selectedIngredient].filter(name => {
            return name === item.name
        })

        // console.log('Count: ',count);

        return (
            <div key={item.name} className=' my-3 border-bottom'>
                <div className="row">
                    <div className="col-6 mt-2">
                        {item.name.toString().charAt(0).toUpperCase() + item.name.toString().slice(1)}
                    </div>

                    <div className="col-6 text-end m-0 p-0">
                        <button onClick={() => addIngredient(item.name)} className="btn btn-sm btn-success mx-1">Add</button>
                        <button disabled={count <= 0} onClick={() => removeIngredient(item.name)} className="btn btn-sm btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        )
    })



    const toggle = () => {
        props.dispatch({
            type: CHANGE_ORDER_SUMMERY_MODAL,
            value: !props.orderSummeryModal
        })
    }

    return (
        <div>
            <Card>
                <CardHeader className='text-center'>
                    Add Ingredient
                </CardHeader>
                <CardBody>
                    {ingredientName}
                </CardBody>
                <CardFooter>
                    <button onClick={toggle} className='btn btn-outline-success w-100 '>Show order summery</button>
                </CardFooter>
            </Card>
            <OrderSummery />
        </div>
    )
}


export default connect(mapStateToProps)(IngredientCard)