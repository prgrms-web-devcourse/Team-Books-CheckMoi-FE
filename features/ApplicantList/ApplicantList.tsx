import { Button, Divider, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ApplicantsType } from "../../types/applicantType";
import { Applicant } from "./Applicant/Applicant";
import * as S from "./style";

interface ApplicantListProps {
  applicantList: ApplicantsType[];
}

export const ApplicantList = ({ applicantList }: ApplicantListProps) => {
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
          <S.TitleWrapper>
            <Typography>스터디 신청자 목록</Typography>
            <Divider />
          </S.TitleWrapper>
          <S.ApplicantList>
            {applicantList.length !== 0 &&
              applicantList &&
              applicantList.map((applicant) => (
                <Applicant
                  key={applicant.id}
                  id={applicant.id}
                  name={applicant.name}
                  image={applicant.image}
                  temperature={applicant.temperature}
                />
              ))}
            {/* <Applicant
              name="Hello I'm Dummy1"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy2"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy3"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy4"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy5"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy6"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy7"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy7"
              image="https://picsum.photos/200"
              temperature={36.5}
            />
            <Applicant
              name="Hello I'm Dummy7"
              image="https://picsum.photos/200"
              temperature={36.5}
            /> */}
          </S.ApplicantList>
        </S.StyledModal>
      </Modal>
    </>
  );
};
