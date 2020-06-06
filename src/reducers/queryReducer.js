import {
  SET_QUERIES,
  SET_CHANGES,
  SET_CURRENT_QUERRY,
  SET_JSONRESPONSES,
} from "../actions/types";

const initialState = {
  queries: [],
  changes: {},
  jsons: [],
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
    case SET_CURRENT_QUERRY:
      return {
        ...state,
        current: action.payload,
      };
    case SET_JSONRESPONSES:
      return {
        ...state,
        jsons: [...jsons, action.payload],
      };
    default:
      return state;
  }
}
