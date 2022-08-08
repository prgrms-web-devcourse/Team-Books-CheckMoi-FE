import React from "react";
import { StudyOpen } from "../../features";
import * as S from "../../styles/StudyOpenPageStyle";

interface StudyOpenPageProps {
  dummy: string;
}

const StudyOpenPage = ({ dummy = "" }: StudyOpenPageProps) => {
  return (
    <S.Container>
      <StudyOpen bookId="1" />
    </S.Container>
  );
};

export default StudyOpenPage;
