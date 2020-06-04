import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import queryReducer from "./queryReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  pub: queryReducer
});
