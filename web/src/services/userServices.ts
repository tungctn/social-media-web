import instance from "@/config/axios";

export function signIn(userAccount: { email: string; password: string }) {
  return instance.post("/api/auth/login", userAccount);
}

export function signUp(newUser: {
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  password: string;
}) {
  return instance.post("/api/auth/register", newUser);
}

export function getCurrentUserInfos() {
  return instance.get("/api/users");
}

export function getUserById(id: number) {
  return instance.get(`/api/users/${id}`);
}

export function getUserInfosById(id: number) {
  return instance.get(`/api/users/${id}`);
}

export function updateUser(data: any) {
  return instance.put("/api/users", data);
}

export function deleteAvatar() {
  return instance.delete("/api/users/avatar");
}

export function updatePassword(data: {
  old_password: string;
  password: string;
}) {
  return instance.put("/api/users/password", data);
}
