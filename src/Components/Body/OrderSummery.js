import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { CHANGE_ORDER_SUMMERY_MODAL } from '../../Redux/ActionType'

const mapStateToProps = (state) => ({
    orderSummeryModal: state.orderSummeryModal,
    totalIngredient: state.totalIngredient,
    selectedIngredient: state.selectedIngredient,
})

const OrderSummery = (props) => {

    const toggle = () => {
        props.dispatch({
            type: CHANGE_ORDER_SUMMERY_MODAL,
            value: !props.orderSummeryModal
        })
    }

    let price = 0;
    for (var i of props.totalIngredient) {
        [...props.selectedIngredient].forEach(name => {
            if (name === i.name) {
                price = price + i.price
            }
        })
    }

    let ingredientName = props.totalIngredient.map(item => {

        let count
        count = [...props.selectedIngredient].filter(name => {
            return name === item.name
        })

        return (
            <div key={item.name}>
                <p className=' d-inline-block fw-bolder'>{item.name}</p> :  {count.length} (quantity) x {item.price}/=
            </div>
        )

    })


    return (
        <Modal isOpen={props.orderSummeryModal} toggle={toggle}>
            <ModalHeader className=''>
                <div className=''>Your order summery</div>
            </ModalHeader>
            <ModalBody>
                <h4 className='mb-4'>Total price : {price} BDT</h4>
                {ingredientName}
            </ModalBody>
            <ModalFooter>
                <button onClick={toggle} className='btn btn-danger'>Cancel</button>
                <button disabled={price == 0} className='btn btn-success'><Link className=' text-decoration-none text-white' to='/proceed-form'>Check procedure</Link></button>
            </ModalFooter>
        </Modal>
    )
}


export default connect(mapStateToProps)(OrderSummery)