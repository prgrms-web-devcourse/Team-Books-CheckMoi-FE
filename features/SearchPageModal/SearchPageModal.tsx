import { Button, Modal, Typography } from "@mui/material";
import { useUserActionContext } from "../../hooks/useUserContext";
import * as S from "./style";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SearchPageModal = ({ open, onClose }: Props) => {
  const { openLoginModal } = useUserActionContext();

  const handleLoginClick = () => {
    onClose();
    openLoginModal();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="searchPage-modal-title"
      aria-describedby="searchPage-modal-description"
      disableEnforceFocus
    >
      <S.ModalContentContainer>
        <Typography id="searchPage-modal-title" variant="h6" component="h2">
          이 책은 등록되지 않은 책입니다
        </Typography>
        <S.ModalDescription id="searchPage-modal-description">
          책모이에 책을 등록해주세요
          <br />책 등록은 회원만 가능합니다 로그인하시겠습니까?
        </S.ModalDescription>
        <S.ButtonContainer>
          <Button variant="contained" onClick={handleLoginClick}>
            로그인
          </Button>
          <Button variant="contained" onClick={onClose}>
            닫기
          </Button>
        </S.ButtonContainer>
      </S.ModalContentContainer>
    </Modal>
  );
};
