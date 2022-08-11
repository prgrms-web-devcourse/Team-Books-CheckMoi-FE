import { Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import * as S from "./style";

export const ApplicantList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        신청자 목록 보기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <S.StyledModal>
          {/* TODO 신청자 목록 가져오기 */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            aperiam, voluptates deleniti exercitationem impedit eligendi
            obcaecati, harum repellendus aspernatur repellat aliquid alias
            dolorum? Ipsa, fuga dignissimos ratione nam veritatis quam?
          </Typography>
        </S.StyledModal>
      </Modal>
    </>
  );
};
