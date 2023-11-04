import instance from "@/config/axios";

export function createFriendRequest(data: { receiver_id: number }) {
  return instance.post("/api/friends", data);
}

export function updateFriendState(data: {
  receiver_id: number;
  friend_status: number;
  friend_type?: number;
}) {
  return instance.put("/api/friends", data);
}

export function refuseFriendRequest(data: { receiver_id: number }) {
  return instance.delete("/api/friends", { data });
}

export function getAuthFriendsList() {
  return instance.get("/api/friends");
}

export function getFriendsList(id: number) {
  return instance.get(`/api/friends/${id}`);
}

export function getFriendRequests() {
  return instance.get("/api/friends/request");
}
