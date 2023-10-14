import instance from "@/config/axios";
import axios from "axios";

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return instance.post("/api/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function moderateImage(imageUrl: string) {
  return (
    await axios.post(`${process.env.NEXT_PUBLIC_API_MODERATE_URL}/predict`, {
      url: imageUrl,
    })
  ).data;
}
