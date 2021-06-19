import React from 'react'
import { Component } from 'react';
import {
    Card, CardHeader, CardFooter, CardBody, CardText
} from 'reactstrap';
import ProceedModal from './ProceedModal';
import {connect} from 'react-redux'

const mapDispatchToProps = state => {
    return{
        stateArray: state.stateArray,
        price: state.price,
        itemprices: state.itemprices,
        ingredientCount : state.ingredientCount
    }
}

class CardItem extends Component {

    state = {
        modalOpen: false
    }

    render(){

        const toggle = () => {
            this.setState({
                modalOpen : !this.state.modalOpen
            })
        }

        
        return (
            <div>
                <Card className="w-75 m-auto">
                    <CardHeader className="bg-info">
                        <CardText className="text-center text-white h5">Make your own burger</CardText>
                    </CardHeader>
                    <CardBody>
                        <div className="row">
                            <div className="col-6">
                                Salad {this.props.itemprices.salad} BDT | Quantity {this.props.ingredientCount.salad}
                            </div>
                            <div className="col-6">
                                <button onClick={this.props.add} className="btn btn-primary mx-3" value="salad">Add</button>
                                <button onClick={this.props.remove} className="btn btn-danger" value="salad">Remove</button>
                            </div>
                        </div> <br />
                        <div className="row">
                            <div className="col-6">
                                Meat {this.props.itemprices.meat} BDT | Quantity {this.props.ingredientCount.meat}
                            </div>
                            <div className="col-6">
                                <button onClick={this.props.add} className="btn btn-primary mx-3" value="meat">Add</button>
                                <button onClick={this.props.remove} className="btn btn-danger" value="meat">Remove</button>
                            </div>
                        </div> <br />
                        <div className="row">
                            <div className="col-6">
                                Cheese {this.props.itemprices.cheese} BDT | Quantity {this.props.ingredientCount.cheese}
                            </div>
                            <div className="col-6">
                                <button onClick={this.props.add} className="btn btn-primary mx-3" value="cheese">Add</button>
                                <button onClick={this.props.remove} className="btn btn-danger" value="cheese">Remove</button>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="row">
                            <div className="col-6">
                                <h4>Price : {this.props.price}/=</h4>
                            </div>

                            <div className="col-6 text-center">
                                <button onClick={toggle} disabled={this.props.stateArray.length === 0}  className="btn btn-outline-success">Order now</button>
                            </div>
                        </div>

                        <ProceedModal ingredientLoader={this.props.ingredientLoader} open={this.state.modalOpen} toggle={toggle} />

                    </CardFooter>
                </Card>
            </div>
        )
    }
}

export default connect(mapDispatchToProps)(CardItem)