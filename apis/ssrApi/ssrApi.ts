import axios from "axios";

export const apiSSR = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  timeout: 10000,
});

apiSSR.interceptors.response.use(
  (res) => {
    if (!(res.status === 200 || res.status === 201 || res.status === 204))
      throw new Error();

    if (res.data.errors) throw new Error(res.data.errors);

    return res.data.data;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
