import { LOGIN_ERRORS, REGISTER_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ERRORS:
      return {
        ...state,
        errors : {username:"username"}
    }
    case REGISTER_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
