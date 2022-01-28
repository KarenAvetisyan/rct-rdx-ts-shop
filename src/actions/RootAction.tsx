
// CONSTANTS
export const CONSTANTS = {
    ADD_CART: "ADD_CART",
    REMOVE_SINGLE_CART: "REMOVE_SINGLE_CART",
    INCREASE_QTY: "INCREASE_QTY",
    DECREASE_QTY: "DECREASE_QTY",
    CLEAR_CARTS: "CLEAR_CARTS",
    ADD_TO_HISTORY: "ADD_TO_HISTORY",
    CLEAR_HISTORY: "CLEAR_HISTORY",
}

//-- ADD CART
export const addCart = (title: String, price: Number, old_price: Number, imgUrl: String, id: Number, order_number: Number) => {
    return {
        type: CONSTANTS.ADD_CART,
        payload: {title, price, old_price, imgUrl, id, order_number} 
    }
} 

//-- REMOVE CART
export const removeCart = (id: Number) => {
    return {
        type: CONSTANTS.REMOVE_SINGLE_CART,
        payload: id 
    }
}

//-- INCREASE QTY OF SINGLE CART  
export const increaseQty = (id: Number, qty: Number, price: Number) => {
    return {
        type: CONSTANTS.INCREASE_QTY,
        payload: {id, qty, price} 
    }
}

//-- DECREASE QTY OF SINGLE CART  
export const decreaseQty = (id: Number, qty: Number, price: Number) => {
    return {
        type: CONSTANTS.DECREASE_QTY,
        payload: {id, qty, price} 
    }
}

//-- CLEAR CARTS
export const clearCarts = (carts: any) => {
    return {
        type: CONSTANTS.CLEAR_CARTS,
        payload: {carts} 
    }
}

// HISTORY 
export const addToHistory = (moveToHistory:any, myDate: any, myAddress:string) => {
    return {
        type: CONSTANTS.ADD_TO_HISTORY,
        payload: {moveToHistory, myDate, myAddress}
    }
}

// CLEAR HISTORY 
export const clearHistory = (history: any) => {
    return {
        type: CONSTANTS.CLEAR_HISTORY,
        payload: {history}
    }
}