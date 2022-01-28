import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import cartHistroyReducer from "./cartHistroyReducer";

export default combineReducers({
  cartState: cartReducer,
  cartHistoryState: cartHistroyReducer
});