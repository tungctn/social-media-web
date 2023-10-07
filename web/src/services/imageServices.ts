import instance from "@/config/axios";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await instance.post("/api/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
