import axios from "axios";
import { setAlert } from "./alert";
// import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_DATA,
} from "./types";

//Load User

export function loadUser() {
  return async function (dispatch, getState) {
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }

    try {
      const res = await axios.get("/api/auth", tokenConfig(getState));
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
}

//Register User
export function register({ name, email, password }) {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    console.log(body);
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
}

//Login User
export function login(email, password) {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    // console.log(body);
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
}

//Logout /ClearProfile

export function logout() {
  return function (dispatch) {
    dispatch({ type: CLEAR_DATA });
    dispatch({
      type: LOGOUT,
    });
  };
}

export function tokenConfig(getState) {
  //Get token from localStorage
  //goes to authReducer and gets token from initial state
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
}
