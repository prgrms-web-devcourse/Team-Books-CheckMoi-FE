import { Box, Button, Typography, Modal } from "@mui/material";
import { useState } from "react";
import * as S from "./style";

export const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginButtonClick = () => setIsModalOpen(true);

  const handleModalClose = () => setIsModalOpen(false);

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
        open={isModalOpen}
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
            {/* TODO 구글 로그인 추가 */}
            <Button variant="contained">구글 로그인</Button>
          </S.ButtonContainer>
        </Box>
      </Modal>
    </>
  );
};
