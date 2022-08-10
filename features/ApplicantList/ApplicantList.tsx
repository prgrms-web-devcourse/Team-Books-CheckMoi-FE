import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import * as S from "./style";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ApplicantList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("Modal open");

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
        className="sdsa"
      >
        <S.StyledModal>
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
