import { Avatar, Skeleton } from "@mui/material";
import * as S from "./style";

interface CommentSkeletonProps {
  size?: string;
}

export const CommentSkeleton = ({ size = "19px" }: CommentSkeletonProps) => {
  return (
    <S.CommentContainer>
      <S.UserWrapper>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <S.CommentWriterSkeleton variant="rectangular" size={size} />
      </S.UserWrapper>
      <S.CommentContentSkeleton size={size}>
        <Skeleton variant="rectangular" height="100%" />
      </S.CommentContentSkeleton>
    </S.CommentContainer>
  );
};
