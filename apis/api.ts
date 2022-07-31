import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  timeout: 10000,
});

// interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (res) => {
    if (res.status !== 200) throw new Error("res error");

    return res.data;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
