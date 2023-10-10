import instance from "@/config/axios";

export function createPost(post: any) {
  return instance.post("/api/posts", post);
}
