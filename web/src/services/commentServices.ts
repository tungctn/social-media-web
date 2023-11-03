import instance from "@/config/axios";

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
