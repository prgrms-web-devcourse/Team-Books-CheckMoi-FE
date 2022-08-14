import { Box, Button, Modal, Typography } from "@mui/material";
import { logout as logoutApi } from "../../../apis/user";
import { useOurSnackbar } from "../../../hooks/useOurSnackbar";
import { useUserActionContext } from "../../../hooks/useUserContext";
import * as S from "./style";

interface LogoutModalProps {
  open: boolean;
  handleModalClose: () => void;
}

const LogoutModal = ({ open, handleModalClose }: LogoutModalProps) => {
  const { logout } = useUserActionContext();
  const { renderSnackbar } = useOurSnackbar();

  const handleLogoutClick = async () => {
    try {
      await logoutApi();
      document.cookie = "token=; path=/; max-age=0;";
      logout();
      renderSnackbar("로그아웃에 성공했습니다");
    } catch (error) {
      renderSnackbar("로그아웃에 실패했습니다", "warning");
    }
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
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          정말 로그아웃 하시겠습니까?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          로그아웃하면 일부 서비스 기능을 사용할 수 없습니다
        </Typography>
        <S.ButtonContainer>
          <Button variant="contained" onClick={handleLogoutClick}>
            로그아웃
          </Button>
          <Button variant="contained" onClick={handleModalClose}>
            취소
          </Button>
        </S.ButtonContainer>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
