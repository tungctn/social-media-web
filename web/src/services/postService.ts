import instance from "@/config/axios";

export function createPost(post: any) {
  return instance.post("/api/posts", post);
}

export function getAllPosts() {
  return instance.get("/api/posts");
}

export function getPostById(id: number) {
  return instance.get(`/api/posts/${id}`);
}
