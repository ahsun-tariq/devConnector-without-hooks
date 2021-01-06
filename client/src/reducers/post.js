import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function post(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST: {
      return {
        ...state,
        post: payload,
        loading: false,
      };
    }

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      console.log(payload.likes);
      state.posts.map((post) =>
        post._id == payload.id ? console.log("matched", post._id) : null
      );
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
