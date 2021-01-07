import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  GET_POST,
  GET_PROFILE,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
} from "./types";
import { tokenConfig } from "./auth";
import equal from "fast-deep-equal";

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

//Add Like
export function addLike(postID) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.put(
        `/api/posts/like/${postID}`,
        null,
        tokenConfig(getState)
      );
      dispatch({
        type: UPDATE_LIKES,
        payload: { id: postID, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
}

//Add Like
export function removeLike(postID) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.put(
        `/api/posts/unlike/${postID}`,
        null,
        tokenConfig(getState)
      );
      dispatch({
        type: UPDATE_LIKES,
        payload: { id: postID, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
}

export function fetchUpdatedPosts(posts) {
  return function (dispatch, getState) {
    const storedPosts = getState().post.posts;
    if (!equal(posts, storedPosts)) console.log("not equal");
    else console.log("equal");

    dispatch({
      type: GET_POST,
      payload: storedPosts,
    });
  };
}

export function getPostByID(postID) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.get(
        `/api/posts/${postID}`,
        tokenConfig(getState)
      );
      dispatch({
        type: GET_POST,
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

//Delete Post
export function deletePost(postID) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.delete(
        `/api/posts/${postID}`,
        tokenConfig(getState)
      );
      dispatch({
        type: DELETE_POST,
        payload: { id: postID },
      });
      console.log(res);
      dispatch(setAlert(res.data.msg, "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
}

//Add a post

export function addPost(formData) {
  console.log(formData);
  return async function (dispatch, getState) {
    try {
      const res = await axios.post(
        "/api/posts",
        formData,
        tokenConfig(getState)
      );
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });

      dispatch(setAlert("post created", "success"));
    } catch (err) {
      // const errors = null;
      // if (err.response.data.errors) {
      //   const errors = err.response.data.errors;
      // }

      // if (errors) {
      //   console.log(errors);
      //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      // }
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
}
