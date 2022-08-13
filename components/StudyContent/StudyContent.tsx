import type { MouseEventHandler } from "react";
import * as S from "./style";

interface StudyContentProps {
  description: string;
  isMember: boolean;
  joinOnClick: MouseEventHandler<HTMLButtonElement>;
  goStudyOnClick: MouseEventHandler<HTMLButtonElement>;
  height?: string | number;
}

export const StudyContent = ({
  description,
  isMember = false,
  joinOnClick,
  goStudyOnClick,
  height = 10,
}: StudyContentProps) => {
  return (
    <S.StudyContentContainer>
      <S.StudyContent height={height}>{description}</S.StudyContent>
      {isMember ? (
        <S.StyleButton onClick={goStudyOnClick} variant="contained">
          스터디룸으로 이동하기
        </S.StyleButton>
      ) : (
        <S.StyleButton onClick={joinOnClick} variant="contained">
          참여하기
        </S.StyleButton>
      )}
    </S.StudyContentContainer>
  );
};
