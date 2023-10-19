import instance from "@/config/axios";
import { REACT_TYPE } from "@/constants/Others";

export function createPost(post: any) {
  return instance.post("/api/posts", post);
}

export function getAllPosts() {
  return instance.get("/api/posts");
}

export function getPostById(id: number) {
  return instance.get(`/api/posts/${id}`);
}

export function reactPost(id: number, reactType: REACT_TYPE) {
  return instance.post("/api/posts/reacts", {
    type_react: reactType,
    post_id: id,
  });
}
