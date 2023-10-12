import instance from "@/config/axios";

export function createPost(post: any) {
  return instance.post("/api/posts", post);
}

export function getAllPosts() {
  return instance.get("/api/posts");
}
