import axios from "axios";
import { SET_ALERT } from "./alert";
import { GET_POSTS, GET_PROFILE, POST_ERROR } from "./types";
import { tokenConfig } from "./auth";

//Get posts
export function getPosts() {
  return async function (dispatch, getState) {
    try {
      const res = await axios.get("/api/posts", tokenConfig(getState));
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
}
