import { SET_QUERIES, SET_CHANGES } from "../actions/types";

const initialState = {
  queries: [],
  changes: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUERIES:
      return {
        ...state,
        queries: action.payload,
      };
    case SET_CHANGES:
      return {
        ...state,
        changes: action.payload,
      };
    default:
      return state;
  }
}
