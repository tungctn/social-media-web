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

export function getPostsByUserId(userId: number) {
  return instance.get(`/api/posts/user/${userId}`);
}

export function getSavedPostsOfAuthUser() {
  return instance.get(`/api/posts/save`);
}

export function savePost(id: number) {
  return instance.post(`/api/posts/save/${id}`);
}

export function unSavePost(id: number) {
  return instance.post(`/api/posts/unsave/${id}`);
}

export function checkPostSaved(id: number) {
  return instance.get(`/api/posts/save/${id}`);
}

export function report(postId: number, data: { type_report: 1 | 2 }) {
  return instance.post(`/api/posts/report/${postId}`, data);
}

export function getReportedPosts() {
  return instance.get("/api/admins/reports/posts");
}

export function updateStatusReportedPost(
  id: number,
  data: { status: number; error_list?: string | null },
) {
  return instance.post(`/api/admins/reports/posts/${id}`, data);
}

export async function moderateContent(content: string) {
  return (
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_MODERATE_URL}/predict/text`,
      {
        caption: content,
      },
    )
  ).data;
}
