import { Button, Divider, Modal, Typography } from "@mui/material";
import { useState } from "react";
import type { ApplicantMemberType } from "../../types/applicantType";
import { Applicant } from "./Applicant/Applicant";
import * as S from "./style";

interface ApplicantListProps {
  applicantList: ApplicantMemberType[];
  onAccepted: (id: string) => void;
  onDenied: (id: string) => void;
}

export const ApplicantList = ({
  applicantList,
  onAccepted,
  onDenied,
}: ApplicantListProps) => {
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
            {applicantList.length !== 0 ? (
              applicantList?.map((applicant) => (
                <Applicant
                  key={applicant.id}
                  id={applicant.id}
                  name={applicant.user.name}
                  image={applicant.user.image}
                  temperature={applicant.user.temperature}
                  onAccepted={onAccepted}
                  onDenied={onDenied}
                />
              ))
            ) : (
              <S.NoApplicant>
                <Typography>신청자가 없습니다.</Typography>
              </S.NoApplicant>
            )}
          </S.ApplicantList>
        </S.StyledModal>
      </Modal>
    </>
  );
};
