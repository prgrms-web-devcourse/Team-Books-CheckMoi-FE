import axios from "axios";
import type { AxiosError, AxiosRequestHeaders } from "axios";
import type { ErrorDataType } from "../types/errorTypes";

const accessTokenExpiredMessage = "만료된 액세스 토큰입니다";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  timeout: 10000,
});

interface HeaderType extends AxiosRequestHeaders {
  ["Content-Type"]: string;
  Authorization: string;
}

// interceptor
apiClient.interceptors.request.use(
  (config) => {
    const headers = config.headers as HeaderType;
    const [_, token] = document.cookie.split("token=");
    if (token) {
      headers["Content-Type"] = "application/json";
      headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface RefreshedTokenType {
  accessToken: string;
}

apiClient.interceptors.response.use(
  (res) => {
    if (!(res.status === 200 || res.status === 201 || res.status === 204))
      throw new Error();

    if (res.data.errors) throw new Error(res.data.errors);

    return res.data.data;
  },
  async (error) => {
    const err = error as AxiosError;

    if (err.response?.status === 401) {
      const data = err.response.data as ErrorDataType;

      if (data.errors[0].message === accessTokenExpiredMessage) {
        const { accessToken } = await apiClient.get<
          RefreshedTokenType,
          RefreshedTokenType
        >("/tokens");
        document.cookie = `token=${accessToken}; path=/; max-age=3600`;
        err.config.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const originalResponse = await axios.request(err.config);
        return originalResponse.data.data;
      }

      document.cookie = `token=; path=/; max-age=0`;
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
