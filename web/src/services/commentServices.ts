import instance from "@/config/axios";
import { ReactType } from "@/constants/Others";

export function createComment(data: {
  content: string;
  post_id: number;
  comment_reply?: number;
  images_ids?: number[];
}) {
  return instance.post("/api/comments", data);
}

export function getComments(postId: number) {
  return instance.get(`/api/comments/${postId}`);
}

export function deleteComment(id: number) {
  return instance.delete(`/api/comments/${id}`);
}

export function updateComment(
  id: number,
  data: {
    content: string;
    image_ids?: number[];
  },
) {
  return instance.put(`/api/comments/${id}`, data);
}

export function reactComment(data: {
  type_react: ReactType;
  comment_id: number;
}) {
  return instance.post("/api/comments/reacts", data);
}

export function unReactComment(id: number) {
  return instance.delete(`/api/comments/unreact/${id}`);
}
