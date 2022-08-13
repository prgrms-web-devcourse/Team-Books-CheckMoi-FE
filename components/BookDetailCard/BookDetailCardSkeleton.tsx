import { Skeleton } from "@mui/material";
import * as S from "./style";

interface BookDetailCardSkeletonProps {
  size: number;
}

export const BookDetailSkeleton = ({
  size = 208,
}: BookDetailCardSkeletonProps) => {
  return (
    <S.BookDetailCard>
      <S.ImageContainer>
        <Skeleton variant="rectangular" width={size} height={size * 1.5} />
        <S.ButtonSkeleton variant="rectangular" />
      </S.ImageContainer>
      <S.BookInfoConatiner>
        {[0, 1, 2, 3].map((key) => (
          <S.TextSkeletonWrapper key={key} width="10rem" height="25px">
            <S.FullHeightSkeleton variant="rectangular" />
          </S.TextSkeletonWrapper>
        ))}
        <S.TextSkeletonWrapper width="100%" height="9rem">
          <S.FullHeightSkeleton variant="rectangular" />
        </S.TextSkeletonWrapper>
      </S.BookInfoConatiner>
    </S.BookDetailCard>
  );
};
