import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_DATA,
  ACCOUNT_DELETED,
} from "./types";
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

//Add Experience
export function addExperience(formData, history) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.put(
        "/api/profile/experience",
        formData,
        tokenConfig(getState)
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Added", "success"));
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
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

//Add Education
export function addEducation(formData, history) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.put(
        "/api/profile/education",
        formData,
        tokenConfig(getState)
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Added", "success"));
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
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

// Delete experience
export function deleteExperience(id) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.delete(
        `/api/profile/experience/${id}`,
        tokenConfig(getState)
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Removed", "warning"));
    } catch (err) {
      const errors = err.response.data.errors;
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

// Delete experience
export function deleteEducation(id) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.delete(
        `/api/profile/education/${id}`,
        tokenConfig(getState)
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Removed", "warning"));
    } catch (err) {
      const errors = err.response.data.errors;
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

//Delete account and profile
export function deleteAccount() {
  return async function (dispatch, getState) {
    if (window.confirm("Are you sure? This can not be undone!")) {
      try {
        const res = await axios.delete(`/api/profile`, tokenConfig(getState));
        dispatch({
          type: CLEAR_DATA,
        });

        dispatch({
          type: CLEAR_DATA,
        });

        dispatch({
          type: ACCOUNT_DELETED,
        });

        dispatch(
          setAlert("Your Account has been permanently deleted", "warning")
        );
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
}
