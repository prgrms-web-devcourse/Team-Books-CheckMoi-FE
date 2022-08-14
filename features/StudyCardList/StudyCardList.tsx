import React, { useState } from "react";
import { Modal } from "@mui/material";
import type { StudyType } from "../../types/studyType";
import { Spacer, StudyCard } from "../../components";
import { StudyDetail } from "../StudyDetail";
import * as S from "./style";

export interface StudyCardListProps {
  studies: StudyType[];
}

export const StudyCardList = ({ studies }: StudyCardListProps) => {
  const [selectedId, setSelectedId] = useState(-1);
  const [open, setOpen] = useState(false);

  const handleStudyClick = (id: number) => {
    setSelectedId(id);
    setOpen(!open);
  };

  const handleCloseClick = () => setOpen(false);

  return (
    <>
      <S.StudyCardContainer>
        {studies.length !== 0 ? (
          studies.map((study) => {
            return (
              <Spacer size={1} key={study.id}>
                <StudyCard
                  onClick={() => handleStudyClick(study.id)}
                  study={study}
                  size={128}
                />
              </Spacer>
            );
          })
        ) : (
          <S.NotStudy>스터디가 없습니다.</S.NotStudy>
        )}
      </S.StudyCardContainer>

      <Modal
        open={open}
        onClose={handleCloseClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus
      >
        <S.StyledBox>
          <StudyDetail open={open} id={selectedId} />
        </S.StyledBox>
      </Modal>
    </>
  );
};
