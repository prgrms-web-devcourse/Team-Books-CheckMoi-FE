import { Skeleton } from "@mui/material";
import * as S from "./style";

interface BookCardSkeletonProps {
  size: number;
}

export const BookCardSkeleton = ({ size }: BookCardSkeletonProps) => {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={`${size}rem`}
        height={`${size * 1.25}rem`}
      />
      <S.BookTitle />
    </div>
  );
};
