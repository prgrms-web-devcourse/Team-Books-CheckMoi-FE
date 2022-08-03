import type { MouseEventHandler } from 'react';
import * as S from './style';

interface StudyContentProps {
  description: string;
  isMember: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const StudyContent = ({
  description,
  isMember = false,
  onClick,
}: StudyContentProps) => {
  return (
    <S.StudyContentContainer>
      <S.StudyContent>{description}</S.StudyContent>
      <S.StyleButton onClick={onClick} variant="contained">
        {isMember ? '스터디룸으로 이동하기' : '참여하기'}
      </S.StyleButton>
    </S.StudyContentContainer>
  );
};
