import type { MouseEventHandler } from "react";
import * as S from "./style";

interface StudyContentProps {
  description: string;
  isMember: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  height?: string | number;
}

export const StudyContent = ({
  description,
  isMember = false,
  onClick,
  height = 10,
}: StudyContentProps) => {
  return (
    <S.StudyContentContainer>
      <S.StudyContent height={height}>{description}</S.StudyContent>
      <S.StyleButton onClick={onClick} variant="contained">
        {isMember ? "스터디룸으로 이동하기" : "참여하기"}
      </S.StyleButton>
    </S.StudyContentContainer>
  );
};
