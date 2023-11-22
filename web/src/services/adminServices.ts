import instance from "@/config/axios";
import { TimeStatistics } from "@/constants/Others";

export function getLoginHistory(data: { time_statistics: TimeStatistics }) {
  return instance.post("/api/dashboard/login-history", data);
}

export function getStatisticalNumber() {
  return instance.post("/api/dashboard/number");
}

export function getPortsNumberWithTopic() {
  return instance.post("/api/dashboard/post-label");
}