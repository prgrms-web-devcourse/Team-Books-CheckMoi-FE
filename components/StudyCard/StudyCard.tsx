import Image from 'next/image';
import { StudyType } from '../../types/studyType';
import * as S from './style';

interface StudyCardProps extends StudyType {
  size: number;
  src: string;
  maxParticipant: number;
  currentParticipant: number;
}

export const StudyCard = ({
  size = 128,
  src = 'https://picsum.photos/200',
  name = '스터디 제목',
  gatherStartDate = '',
  gatherEndDate = '',
  studyStartDate = '',
  studyEndDate = '',
  maxParticipant = 16,
  currentParticipant = 0,
}: StudyCardProps) => {
  return (
    <S.StudyCard>
      <S.ImageWrapper>
        <Image width={size} height={size * 1.5} src={src} />
      </S.ImageWrapper>
      <S.StudyInfoConatiner>
        <S.ResponsiveText fontSize={1.2}>{name}</S.ResponsiveText>
        <S.ResponsiveText>
          모집 인원 : {currentParticipant}/{maxParticipant}
        </S.ResponsiveText>
        <S.ResponsiveText>
          모집 기간 : {`${gatherStartDate} - ${gatherEndDate}`}
        </S.ResponsiveText>
        <S.ResponsiveText>
          진행 기간 : {`${studyStartDate} - ${studyEndDate}`}
        </S.ResponsiveText>
      </S.StudyInfoConatiner>
    </S.StudyCard>
  );
};
