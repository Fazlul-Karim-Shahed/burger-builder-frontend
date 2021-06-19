import { Redirect } from 'react-router-dom'
const initialState = {

    stateArray: [],
    price: 80,
    itemprices: {
        salad: 50,
        meat: 100,
        cheese: 150
    },
    ingredientCount: {
        salad: 0,
        meat: 0,
        cheese: 0
    },
    cartArray: [],
    localId : null,
    idToken : null,
    authenticated : false,
    spinner : false
   
}

const Reducer = (state = initialState, action) => {
    
    
    if (action.type === "ADD_INGREDIENT"){
        state.stateArray.push(action.value)
        const stateArray = [...state.stateArray]
        return{
            ...state,
            stateArray
        }
    }

    if (action.type === "REMOVE_INGREDIENT") {
        const stateArray = action.value
        return{
            ...state,
            stateArray

        }
    }

    if (action.type === "COUNT_INGREDIENT"){
        return{
            ...state,
            ingredientCount : {
                salad : action.value.salad,
                meat: action.value.meat,
                cheese: action.value.cheese,
            }
        }
    }

    if (action.type === "UPDATE_PRICE"){
        return {
            ...state,
            price : action.value
        }

    }

    
    if (action.type === "CheckAuth"){
        return {
            ...state,
            authenticated : action.authenticated  
        }
    }

    if (action.type === "fastCheck"){
        let expireTime = localStorage.getItem("expireTime")

        return{
            ...state,
            authenticated: new Date() < new Date(expireTime) ? true : false
        }
    }

    if (action.type === "LOGOUT"){
        return{
            ...state,
            authenticated : false
        }
    }

    if(action.type === "CART"){
        
        const cartArray = [...action.cartArray]
        return{
            ...state,
            cartArray
        }
    }

    if(action.type === "SPINNER"){
        return{
            ...state,
            spinner : action.value
        }
    }
   
    return state

}

export default Reducer