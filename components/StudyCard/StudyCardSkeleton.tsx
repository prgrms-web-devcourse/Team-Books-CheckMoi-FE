import { Skeleton } from "@mui/material";
import * as S from "./style";

interface StudyCardSkeletonProps {
  size?: number;
}

export const StudyCardSkeleton = ({ size = 128 }: StudyCardSkeletonProps) => {
  return (
    <S.StudyCard>
      <S.StudyThumbnailSkeleton width={size} height={size * 1.5}>
        <Skeleton variant="rectangular" width={size} height="100%" />
      </S.StudyThumbnailSkeleton>
      <S.StudyInfoConatiner>
        <S.StudyInfoSkeleton width="16rem" height="23px">
          <Skeleton variant="rectangular" />
        </S.StudyInfoSkeleton>
        <S.StudyInfoSkeleton width="8rem" height="23px">
          <Skeleton variant="rectangular" />
        </S.StudyInfoSkeleton>
        <S.StudyInfoSkeleton width="16rem" height="19px">
          <Skeleton variant="rectangular" />
        </S.StudyInfoSkeleton>
        <S.StudyInfoSkeleton width="16rem" height="19px">
          <Skeleton variant="rectangular" />
        </S.StudyInfoSkeleton>
      </S.StudyInfoConatiner>
    </S.StudyCard>
  );
};
