import { CONSTANTS } from "../actions/RootAction";

const initState = [];

const cartHistroyReducer = (state = initState, action) => {
    switch(action.type) {
        // add to history 
        case CONSTANTS.ADD_TO_HISTORY: {

          let newState = [...state,  ...action.payload.moveToHistory];

          newState.map(d => {
            if(d.myDate === '' || d.myAddress === ''){
              return  d.myDate = action.payload.myDate, d.myAddress = action.payload.myAddress;
            }
            else {
              return d;
            }
          })

          return newState;

        }

        // clear history 
        case CONSTANTS.CLEAR_HISTORY: {
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


export default cartHistroyReducer;