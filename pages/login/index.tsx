import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress as CircularLoading } from "@mui/material";
import { StyledBackDrop } from "../../styles/LoginPageStyle";
import { getMyInfo } from "../../apis/user";
import { useUserActionContext } from "../../hooks/useUserContext";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";

const LoginPage = () => {
  const { login } = useUserActionContext();
  const router = useRouter();
  const { token } = router.query;
  const [isLoginDone, setIsLoginDone] = useState<boolean | null>(null);
  const { renderSnackbar } = useOurSnackbar();

  useEffect(() => {
    if (token) {
      document.cookie = `token=${token}; path=/; max-age=3600;`;

      const loginLogic = async () => {
        try {
          const userInfo = await getMyInfo();
          login(userInfo);
          setIsLoginDone(true);
        } catch (error) {
          setIsLoginDone(false);
        }
      };

      loginLogic();
    }
  }, [token]);

  useEffect(() => {
    if (isLoginDone === null) return;

    if (isLoginDone) {
      renderSnackbar("로그인에 성공했습니다");
      router.push("/");
      return;
    }

    router.push("/");
    renderSnackbar("로그인에 실패했습니다", "warning");
  }, [isLoginDone]);

  return (
    <StyledBackDrop open>
      <CircularLoading color="inherit" />
    </StyledBackDrop>
  );
};

export default LoginPage;
