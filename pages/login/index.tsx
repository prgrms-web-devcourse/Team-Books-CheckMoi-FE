import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress as CircularLoading } from "@mui/material";
import { StyledBackDrop } from "../../styles/LoginPageStyle";
import { getMyInfo } from "../../apis/user";
import { useUserActionContext } from "../../hooks/useUserContext";

const LoginPage = () => {
  const { login } = useUserActionContext();
  const router = useRouter();
  const { token } = router.query;
  const [isLoginDone, setIsLoginDone] = useState<boolean | null>(null);

  useEffect(() => {
    if (token) {
      document.cookie = `token=${token}; path=/; max-age=3600;`;
      const userInfo = getMyInfo(token as string);
      userInfo
        .then((responseUser) => {
          login(responseUser);
          setIsLoginDone(true);
        })
        .catch((error) => setIsLoginDone(false));
    }
  }, [token]);

  useEffect(() => {
    if (isLoginDone === null) return;

    if (isLoginDone) {
      router.push("/");
      return;
    }

    router.push("/");
    // TODO alert 추가
    alert("로그인에 실패했습니다");
  }, [isLoginDone]);

  return (
    <StyledBackDrop open>
      <CircularLoading color="inherit" />
    </StyledBackDrop>
  );
};

export default LoginPage;
