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
    if (!(res.status === 200 || res.status === 201 || res.status === 204))
      throw new Error();

    if (res.data.errors) throw new Error(res.data.errors);

    return res.data.data;
  },
  (error) => {
    console.log("Error", error.response.data.errors);
    if (error.response.status === 401) {
      document.cookie = "token=; path=/; max-age=0;";
      window.location.href = "/?error=1";
    }

    return Promise.reject(error);
  }
);
