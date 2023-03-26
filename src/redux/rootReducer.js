// ** Redux Imports
import { combineReducers } from "redux";
import cart from "./reducers/cart.js";
// ** Reducers Imports

const rootReducer = combineReducers({ cart });

export default rootReducer;
