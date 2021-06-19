import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Ingredient from './Ingredient';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        stateArray: state.stateArray,
        price: state.price,
        itemprices: state.itemprices,
        ingredientCount: state.ingredientCount,
        authenticated : state.authenticated
    }
}


function ProceedModal(props) {
    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader>
                    Your Burger <br/>
                </ModalHeader>
                <ModalBody className="">
                    <Ingredient type="top" />
                    {props.ingredientLoader}
                    <Ingredient type="bottom" /> <hr/>
                    <div className="container">
                        Salad: 1 x {props.ingredientCount.salad} <br/>
                        Meat: 1 x {props.ingredientCount.meat} <br />
                        Cheese: 1 x {props.ingredientCount.cheese} <br /><hr/>
                       <div className="text-center">
                            <strong className="">Price : {props.price}/=</strong><hr />
                       </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Link to={props.authenticated ? "/form" : "/login"} className="btn btn-success">Continue to proceed</Link>
                    <button onClick={props.toggle} className="btn btn-danger">Close</button>
                </ModalFooter>
            </Modal>
            
        </div>
    )
}

export default connect(mapStateToProps)(ProceedModal)