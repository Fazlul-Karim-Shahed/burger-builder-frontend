import jwtDecode from 'jwt-decode'
import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardFooter, Badge } from 'reactstrap'


const mapStateToProps = (state) => ({
    orders: state.orders
})

const Orders = (props) => {

    // let decoded = jwtDecode(localStorage.getItem('token'))
    if (props.orders.length == 0) return <h1>You have'nt order yet!</h1>

    let order = props.orders.map(item => {
        console.log(item);
        return (
            <div key={Math.random()} className='w-75 m-auto my-3'>
                <Card>
                    <CardHeader style={{ backgroundColor: '#D70F64', color: 'white' }}>
                        Oder details
                    </CardHeader>
                    <CardBody>
                        User name: {item.name} <br />
                        ID: {item.userId} <br />
                        Placed on: {item.time} <br />
                        Billing Address: {item.address} <br />
                        Mobile: {item.mobile} <br />
                        Payment Status: {item.paymentMethod}
                    </CardBody>
                    <CardFooter>
                        <div className='d-flex justify-content-between'>
                            <p>Price: {item.price} /=</p>
                            <p>Status: <Badge color='danger'>Pending</Badge> </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    })

    return (
        <div>
            {order}
        </div>
    )
}




export default connect(mapStateToProps)(Orders)