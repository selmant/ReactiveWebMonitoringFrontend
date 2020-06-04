import {SET_QUERIES,SET_CHANGES} from "./types";

export const setQueries = (queries) => (dispatch) => {
  console.log("setQueries detected.")
  dispatch({
    type: SET_QUERIES,
    payload: queries
  });
};

export const setChanges = (changes) => (dispatch) => {
  console.log("setChanges detected.")
  dispatch({
    type: SET_CHANGES,
    payload: changes
  });
};
