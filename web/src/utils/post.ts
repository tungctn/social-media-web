import { ReactType } from "@/constants/Others";
import Post from "./fakeData/Post";

export function reactPost(post: Post, reactType: ReactType) {
  const newPost: any = {
    ...post,
  };
  if (post?.type_react == null) {
    newPost.likes_count += 1;
    newPost.type_react = reactType;
  } else if (post?.type_react === reactType) {
    newPost.likes_count -= 1;
    newPost.type_react = null;
  } else {
    newPost.type_react = reactType;
  }

  return newPost;
}
