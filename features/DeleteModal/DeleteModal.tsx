import { Button, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { delPost } from "../../apis";
import * as S from "./style";

interface ModalProps {
  id: number;
  studyId: number;
  open: boolean;
  onClose: () => void;
}

export const DeleteModal = ({ id, studyId, open, onClose }: ModalProps) => {
  const router = useRouter();

  const handleDeleteClick = async () => {
    await delPost(Number(id));
    router.push(`/study/${studyId}`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEnforceFocus
    >
      <S.ModalContentContainer>
        <Typography id="modal-title" variant="h6" component="h2">
          삭제하시겠습니까?
        </Typography>
        <S.ButtonContainer>
          <Button variant="contained" onClick={handleDeleteClick}>
            삭제
          </Button>
          <Button variant="contained" onClick={onClose}>
            닫기
          </Button>
        </S.ButtonContainer>
      </S.ModalContentContainer>
    </Modal>
  );
};
