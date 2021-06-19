import axios from 'axios'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter,CardHeader
} from 'reactstrap';
import CardItem from './CardItem';
import './BodyCss/Cart.css'
import jwtDecode from 'jwt-decode';



const mapStateToprops = state => {
    return{
        cartArray : state.cartArray
    }
}

class Cart extends Component {

    componentDidMount(){

        const decoded = jwtDecode(localStorage.getItem("token"))
        axios.get(`https://myburgerbuilderapp.herokuapp.com/cart`, {
            headers : {
                "userId": decoded._id,
                "email" : decoded.email,   
            }
        })
        .then(res => {
            
            let array = [];
            for(var i in res.data){
                array.unshift(res.data[i])
            }

            const cartArray = [...array]
            console.log(cartArray)
            this.props.dispatch({
                type: "CART",
                cartArray
            })
        })

    }

    render() {
        

        let array

        if(this.props.cartArray !== null){
            array = this.props.cartArray.map (cartItem => {
                
                return <div key={cartItem} className="">
                    <Card className="cartSingle">
                        <CardHeader style={{ backgroundColor:"#D70F64", color:"white"}}>
                            Order Id : {cartItem._id} <br />
                            Price : {cartItem.price} BDT <br/>
                            Items : {cartItem.items.salad} Salad, {cartItem.items.meat} Meat, {cartItem.items.cheese} Cheese
                        </CardHeader>
                        <CardBody className="text-dark font-weight-light border">
                            Name : {cartItem.name}<br/>
                            Email : {cartItem.email}<br/>
                            Location: {cartItem.addressDetail.address} <br/>
                            Order Time : {new Date(cartItem.orderTime).toLocaleString()}
                            
                        </CardBody>
                        <CardFooter className="bg-dark text-white">Pending</CardFooter>
                    </Card>
                </div>
            })
        }
        if(this.props.cartArray.length === 0){
            array = <div className="container"><h1>You have no item in cart</h1></div>
        }


        return (
            <div className="cartTotal">
                {array}
            </div>
        )
    }
}

export default connect(mapStateToprops)(Cart)

