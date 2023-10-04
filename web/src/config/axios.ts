import axios from "axios";

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

instance.interceptors.response.use((response) => {
  if (response.status === 204) {
    return true;
  }
  return response.data;
});

export default instance;
