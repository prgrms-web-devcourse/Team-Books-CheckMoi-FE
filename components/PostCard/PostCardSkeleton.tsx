import { Avatar, Divider, Skeleton } from "@mui/material";
import { Chat } from "@mui/icons-material";
import * as S from "./style";

interface PostCardSkeletonProps {
  size?: number;
}

export const PostCardSkeleton = ({ size = 20 }: PostCardSkeletonProps) => {
  return (
    <S.PostCard>
      <Skeleton variant="rectangular" height="21px" />
      <div style={{ marginTop: "0.5rem", height: "4rem" }}>
        <Skeleton variant="rectangular" height="100%" />
      </div>
      <div style={{ margin: "0.5rem 0", height: "1rem" }}>
        <Skeleton variant="rectangular" width="7rem" height="100%" />
      </div>
      <Divider light />
      <S.PostBottomContainer>
        <S.PostUserWarpper>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <S.PostCardWriterSkeleton>
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </S.PostCardWriterSkeleton>
        </S.PostUserWarpper>
        <S.StyledBadge badgeContent="?" color="primary">
          <Chat color="action" />
        </S.StyledBadge>
      </S.PostBottomContainer>
    </S.PostCard>
  );
};
