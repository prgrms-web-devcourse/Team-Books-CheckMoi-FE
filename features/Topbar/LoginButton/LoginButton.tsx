import { Box, Button, Typography, Modal } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import {
  useUserActionContext,
  useUserContext,
} from "../../../hooks/useUserContext";
import * as S from "./style";

export const LoginButton = () => {
  const { isLoginModalOpen } = useUserContext();
  const { openLoginModal, closeLoginModal } = useUserActionContext();
  const router = useRouter();

  const handleLoginButtonClick = () => openLoginModal();

  const handleModalClose = () => closeLoginModal();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handle401ButtonClick = async () => {
    const { data } = await axios.get<string>(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/tokens/7/test?accessTime=10000&refreshTime=30000`
    );
    router.push({
      pathname: "/login",
      query: {
        token: data,
      },
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleLoginButtonClick}>
        로그인
      </Button>
      <Modal
        open={isLoginModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            책모이 로그인
            <button type="button" onClick={handle401ButtonClick}>
              401 테스트
            </button>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            책모이는 카카오 로그인으로 이용할 수 있습니다
          </Typography>
          <a href={process.env.NEXT_PUBLIC_KAKAO_API}>
            <S.KakaoButton src="/images/kakao_login_medium_wide.png" alt="" />
          </a>
        </Box>
      </Modal>
    </>
  );
};
