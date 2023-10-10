import instance from "@/config/axios";

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return instance.post("/api/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
