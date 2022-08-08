import { Box, Button, Typography, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { fakeLogin } from "../../../apis/user";
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

  const handleFakeLoginClick = async () => {
    const fakeToken = await fakeLogin();
    handleModalClose();
    router.push(`/login?token=${fakeToken}`);
  };

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
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            로그인 방법을 선택해주세요
          </Typography>
          <S.ButtonContainer>
            <a href={process.env.NEXT_PUBLIC_KAKAO_API}>
              <img src="/images/kakao_login_medium.png" alt="" />
            </a>
            {/* TODO 가짜 로그인 삭제하기 */}
            <Button variant="contained" onClick={handleFakeLoginClick}>
              Fake
            </Button>
            {/* TODO 구글 로그인 추가 */}
            <Button variant="contained">구글 로그인</Button>
          </S.ButtonContainer>
        </Box>
      </Modal>
    </>
  );
};
