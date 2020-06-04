import axios from "axios";
import setAuthHeaders from "../utils/setAuthHeaders";
import { REGISTER_ERRORS,LOGIN_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/user/register", userData)
    .then((res) => history.push("/login")) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: REGISTER_ERRORS,
        payload: err.response,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/user/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { username, password } = userData;
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      // Set token to Auth header
      setAuthHeaders(username,password);
      // Decode token to get user data
      //const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(userData));

      window.location.href = "./queries";
    })
    .catch((err) =>
      dispatch({
        type: LOGIN_ERRORS,
        payload: err.response,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};


// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("username");
  localStorage.removeItem("password")
  // Remove auth header for future requests
  setAuthHeaders(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  window.location.href = "./";
};
