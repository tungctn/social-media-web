import instance from "@/config/axios";
import { ReactType } from "@/constants/Others";
import axios from "axios";

export function createPost(post: any) {
  return instance.post("/api/posts", post);
}

export function getAllPosts() {
  return instance.get("/api/posts");
}

export function getPostById(id: number) {
  return instance.get(`/api/posts/${id}`);
}

export function getMyPosts() {
  return instance.get(`/api/posts/user`);
}

export function updatePost(postId: number, post: any) {
  return instance.put(`/api/posts/${postId}`, post);
}

export function deletePost(id: number) {
  return instance.delete(`/api/posts/${id}`);
}

export function reactPost(id: number, reactType: ReactType) {
  return instance.post("/api/posts/reacts", {
    type_react: reactType,
    post_id: id,
  });
}

export function unReactPost(id: number) {
  return instance.delete(`/api/posts/unreact/${id}`);
}

export async function moderateContent(content: string) {
  return (
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_MODERATE_URL}/predict/text`,
      {
        caption: content,
      }
    )
  ).data;
}
