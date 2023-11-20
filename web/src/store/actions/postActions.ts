import { getAllPosts } from "@/services/postService";
import { GET_POSTS } from "../constants/postType";

const getPosts = () => async (dispatch: any) => {
  const response = await getAllPosts();
  const posts = response.data.posts;
  dispatch({ type: GET_POSTS, payload: posts });
};

export { getPosts };
