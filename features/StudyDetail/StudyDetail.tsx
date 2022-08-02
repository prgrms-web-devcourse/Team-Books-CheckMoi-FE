import type { MouseEventHandler } from 'react';
import { Divider } from '@mui/material';
import { User } from '../../types/userType';
import * as S from './style';
import type { StudyType } from '../../types/studyType';
import { StudyContent } from '../../components/StudyContent';
import { StudyDetailCard } from '../../components/StudyDetailCard';

interface StudyDetailProps extends StudyType {
  members: User[];
  description: string;
}

export const StudyDetail = ({
  members,
  description,
  name = '스터디 제목2',
  thumbnailUrl = '',
  gatherStartDate = '2022/6/30',
  gatherEndDate = '2022/7/30',
  studyStartDate = '2022/7/2',
  studyEndDate = '2022/9/2',
  maxParticipant = 16,
  currentParticipant = 0,
}: StudyDetailProps) => {
  return (
    <S.StudyDetailModalContainer>
      <S.StudyDetailContainer>
        <StudyDetailCard
          name={name}
          thumbnailUrl={thumbnailUrl}
          maxParticipant={maxParticipant}
          currentParticipant={currentParticipant}
          gatherStartDate={gatherStartDate}
          gatherEndDate={gatherEndDate}
          studyStartDate={studyStartDate}
          studyEndDate={studyEndDate}
          members={members}
        />
        <Divider color="black" />
        <StudyContent
          description={description}
          isMember={false}
          onClick={() => {}}
        />
      </S.StudyDetailContainer>
    </S.StudyDetailModalContainer>
  );
};
