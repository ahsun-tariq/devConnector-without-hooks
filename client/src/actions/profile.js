import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { tokenConfig } from "./auth";
//Get current users profile

export function getCurrentProfile() {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  //   console.log(localStorage.token);
  // }
  return async function (dispatch, getState) {
    try {
      const res = await axios.get("/api/profile/me", tokenConfig(getState));
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
}

//Create or update profile
export function createProfile(formData, history, edit = false) {
  return async function (dispatch, getState) {
    console.log("action");
    console.log(formData);
    try {
      const res = await axios.post(
        "/api/profile",
        formData,
        tokenConfig(getState)
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
}
