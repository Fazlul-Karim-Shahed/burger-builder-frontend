import { ADD_INGREDIENT, CHANGE_ORDER_SUMMERY_MODAL, CHECK_AUTH, FETCH_INGREDIENT, FETCH_ORDERS, REMOVE_INGREDIENT } from "./ActionType"

const initialState = {
    totalIngredient: [{
        name: 'salad',
        price: 100
    },
    {
        name: 'meat',
        price: 250
    },
    {
        name: 'cheese',
        price: 50
    },

    ],
    selectedIngredient: [],
    orderSummeryModal: false,
    authenticated: false,
    price: 0,
    orders: []
}


const Reducer = (state = initialState, action) => {

    if (action.type === ADD_INGREDIENT) {

        let x = [...state.selectedIngredient]
        x.push(action.value)
        console.log(state.price);

        return {
            ...state,
            selectedIngredient: [...x]
        }
    }

    if (action.type === FETCH_INGREDIENT) {

        let price = 0;
        for (var i of state.totalIngredient) {
            [...action.value].forEach(name => {
                if (name === i.name) {
                    price = price + i.price
                }
            })
        }

        console.log();

        return {
            ...state,
            selectedIngredient: [...action.value],
            price: price
        }
    }

    if (action.type === REMOVE_INGREDIENT) {

        let x = [...state.selectedIngredient]
        x.splice(x.lastIndexOf(action.value), 1)
        console.log(state.price);
        return {
            ...state,
            selectedIngredient: x

        }
    }

    if (action.type === CHANGE_ORDER_SUMMERY_MODAL) {
        console.log(state.orderSummeryModal);
        return {
            ...state,
            orderSummeryModal: action.value
        }
    }

    if (action.type === CHECK_AUTH) {

        return {
            ...state,
            authenticated: action.value
        }
    }

    if (action.type === FETCH_ORDERS) {
        // console.log(action.value);
        return {
            ...state,
            orders: [...action.value]
        }
    }

    return state
}


export default Reducer