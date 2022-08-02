import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { CircularProgress } from "@mui/material";
import { StyledBackDrop } from "../../styles/LoginPageStyle";

// TODO type에 정의한 UserType으로 수정
interface UserType {
  email: string;
  id: number;
  name: string;
  profileImageUrl: string;
  studies: any[];
}

const LoginPage = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token)
      // TODO api 푸시되면 분리
      axios
        .get<AxiosResponse<UserType>>(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // TODO 로그인 유저 정보 쿠키나 로컬스토리지에 저장
          // TODO 로그인 유저 정보 전역 Context로 저장
          console.log(res.data.data);
          // router.push("/");
        })
        .catch((error) => {
          // TODO 로그인 실패 등 에러 처리
        });
  }, [token]);

  return (
    <StyledBackDrop open>
      <CircularProgress color="inherit" />
    </StyledBackDrop>
  );
};

export default LoginPage;
