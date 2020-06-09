import { SET_QUERIES, SET_CHANGES, SET_CURRENT_QUERRY,SET_JSONRESPONSES } from "./types";

export const setQueries = (queries) => (dispatch) => {
  console.log("setQueries detected.");
  dispatch({
    type: SET_QUERIES,
    payload: queries,
  });
};

export const setChanges = (changes) => (dispatch) => {
  console.log("setChanges detected.");
  dispatch({
    type: SET_CHANGES,
    payload: changes,
  });
};

export const setCurrentQuery = (query) => (dispatch) => {
  console.log("setCurrentQuery detected.");
  dispatch({
    type: SET_CURRENT_QUERRY,
    payload: query,
  });
};

export const setJsonResponse = (response) => (dispatch) => {
  console.log("setJsonResponses detected.");
  dispatch({
    type: SET_JSONRESPONSES,
    payload: response,
  });
};
