import { Button, Modal, Typography } from "@mui/material";
import type { ReactNode } from "react";
import * as S from "./style";
import { useUserActionContext } from "../../hooks/useUserContext";

interface LoginRequestModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface LoginRequestModalSubProps {
  children: ReactNode;
}

export const LoginRequestModal = {
  Content: ({ children }: LoginRequestModalSubProps) => {
    return (
      <S.ModalDescription id="searchPage-modal-description">
        {children}
      </S.ModalDescription>
    );
  },
  Title: ({ children }: LoginRequestModalSubProps) => {
    return (
      <Typography id="searchPage-modal-title" variant="h6" component="h2">
        {children}
      </Typography>
    );
  },
  Container: ({ open, onClose, children }: LoginRequestModalProps) => {
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
          {children}
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
  },
};
