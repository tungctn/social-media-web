import { ADD_POST } from "../constants/postType";

const initialPostState = {};

export default function postReducer(state = initialPostState, action: any) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: action.posts,
      };

    default:
      return state;
  }
}
