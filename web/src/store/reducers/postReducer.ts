import {
  GET_POSTS,
} from "../constants/postType";

const initialPostState = {
  posts: [],
};

export default function postReducer(state = initialPostState, action: any) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
