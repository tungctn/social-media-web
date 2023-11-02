import instance from "@/config/axios";
import { REACT_TYPE } from "@/constants/Others";
import axios from "axios";

export function createPost(post: any) {
  return instance.post("/api/posts", post);
}

export function getAllPosts() {
  return instance.get("/api/posts?page_index=1");
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
