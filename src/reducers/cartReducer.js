import { CONSTANTS } from "../actions/RootAction";

const initState = [];

const cartReducer = (state = initState, action) => {
    switch(action.type) {

        // ADD CART 
        case CONSTANTS.ADD_CART: {
            const cart = {
                title: action.payload.title,
                price: action.payload.price,
                old_price: action.payload.old_price,
                imgUrl: action.payload.imgUrl,
                id: action.payload.id,
                qty: 1,
                added:true,
                order_number: action.payload.order_number,
                myDate: '',
                myAddress: ''
            };
            return [...state, cart]
        }

        // REMOVE CART
        case CONSTANTS.REMOVE_SINGLE_CART: {
            const removedCart = state.filter((cart) =>  {
                return cart.id !== action.payload
                });
            return removedCart;
        }

        // INCREASE QTY OF SINGLE CART 
        case CONSTANTS.INCREASE_QTY: {
           return state.filter((cart) =>  {
                if(cart.id === action.payload.id) {
                    return (
                        cart.qty += action.payload.qty
                        // cart.price += 
                    );
                }
                else {
                    return cart.qty
                }
            });
        }

        // DECREASE QTY OF SINGLE CART 
        case CONSTANTS.DECREASE_QTY: {
            return state.filter((cart) =>  {
                if(cart.id === action.payload.id) {
                    return (
                        cart.qty -= action.payload.qty
                        // cart.price -= 
                    )
                }
                else {
                    return cart.qty
                }
             });
         }

        //  CLEAR CARTS 
        case CONSTANTS.CLEAR_CARTS: {
             return state.filter(() => {
                 return;
             })
         }

        // DEFAULT 
        default: {
            return state;
        }
    }
}


export default cartReducer;