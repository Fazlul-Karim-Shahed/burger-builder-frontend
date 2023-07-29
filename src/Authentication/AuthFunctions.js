import React from "react"
import axios from 'axios'
import jwtDecode from "jwt-decode";



export const login = data => {

    console.log(data);
    localStorage.setItem('token', data.value)
}

export const checkAuth = () => {

    const token = localStorage.getItem('token')
    if (token != null) {
        const decoded = jwtDecode(token)
        let time = new Date().getTime()
        if (time < new Date(decoded.exp * 1000)) return true;
        else return false
    }
    return false
}


export const addIngredientToLocal = item => {
    let selectedIngredient
    if (localStorage.getItem('selectedIngredient') != null) {
        selectedIngredient = [...JSON.parse(localStorage.getItem('selectedIngredient'))]
    }

    else {
        selectedIngredient = []
    }
    selectedIngredient.push(item)
    localStorage.setItem('selectedIngredient', JSON.stringify(selectedIngredient))
}

export const removeIngredientToLocal = item => {
    let selectedIngredient
    if (localStorage.getItem('selectedIngredient') != null) {
        selectedIngredient = [...JSON.parse(localStorage.getItem('selectedIngredient'))]
    }
    selectedIngredient.splice(selectedIngredient.lastIndexOf(item), 1)
    localStorage.setItem('selectedIngredient', JSON.stringify(selectedIngredient))
}


export const fetchIngredientFromLocal = item => {
    let selectedIngredient
    if (localStorage.getItem('selectedIngredient') != null) {
        selectedIngredient = [...JSON.parse(localStorage.getItem('selectedIngredient'))]



        return selectedIngredient
    }
    else return []
}


export const fetchOrders = () => {

    if (localStorage.getItem('token') === null) {
        return []
    }
    else {
        let decoded = jwtDecode(localStorage.getItem('token'))
        let data = axios.get(process.env.REACT_APP_BACKEND_URL + `/order/${decoded._id}`).then(data => {

            let order = [];
            if (!data.data.error) {

                for (var i in data.data.value) {
                    order.push(data.data.value[i])
                }
                console.log(order);
                return order
            }

            return order

        })
        return data
    }



}


