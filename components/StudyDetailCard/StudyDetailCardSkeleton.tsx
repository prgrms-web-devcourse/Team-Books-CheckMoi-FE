import { Avatar, AvatarGroup, Skeleton } from "@mui/material";
import { BookCardSkeleton } from "../BookCard";
import * as S from "./style";

interface StudyDetailCardSkeletonProps {
  size?: number;
}

export const StudyDetailCardSkeleton = ({
  size = 10,
}: StudyDetailCardSkeletonProps) => {
  return (
    <S.StudyDetailCard>
      <BookCardSkeleton size={size} />
      <S.StudyInfoContainerSkeleton>
        <S.StudyTypographSkeleton>
          <Skeleton variant="rectangular" height="100%" />
        </S.StudyTypographSkeleton>
        <S.StudyText>
          <Skeleton variant="rectangular" height="100%" />
        </S.StudyText>
        <S.StudyText>
          <Skeleton variant="rectangular" height="100%" />
        </S.StudyText>
      </S.StudyInfoContainerSkeleton>
      <S.AvartarGroupContainerSkeleton>
        <AvatarGroup>
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </S.AvartarGroupContainerSkeleton>
    </S.StudyDetailCard>
  );
};
