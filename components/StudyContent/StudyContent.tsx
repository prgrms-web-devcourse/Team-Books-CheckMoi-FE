import type { MouseEventHandler } from "react";
import * as S from "./style";

interface StudyContentProps {
  content: string;
  isMember: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const StudyContent = ({
  content,
  isMember = false,
  onClick,
}: StudyContentProps) => {
  return (
    <S.StudyContentContainer>
      <S.StudyContent>{content}</S.StudyContent>
      <S.StyleButton onClick={onClick} variant="contained">
        {isMember ? "스터디룸으로 이동하기" : "참여하기"}
      </S.StyleButton>
    </S.StudyContentContainer>
  );
};
