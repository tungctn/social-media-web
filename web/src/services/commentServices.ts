import instance from "@/config/axios";

export function createComment(data: {
  content: string;
  post_id: number;
  images_ids?: number[];
}) {
  return instance.post("/api/comments", data);
}
