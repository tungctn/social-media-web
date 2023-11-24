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

export function getPostsWithNegativeComments(data: {
  time_statistics: TimeStatistics;
  page_index?: number;
  page_size?: number;
}) {
  return instance.post("/api/dashboard/post-negative", data);
}

export function getPostsAnalysis(data: { time_statistics: TimeStatistics }) {
  return instance.post("/api/dashboard/post-count", data);
}
