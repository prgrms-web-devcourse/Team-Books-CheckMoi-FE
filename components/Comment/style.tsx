import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  /* box-shadow: 12px 21px 15px -3px rgba(0, 0, 0, 0.1); */
  border: 1px solid #d7d7d7;
  border-radius: 1rem;
`;

export const UserWrapper = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

interface SkeletonProps {
  size: string;
}

export const CommentWriterSkeleton = styled(Skeleton)<SkeletonProps>`
  width: 100%;
  height: ${({ size }) => size};
`;

export const CommentContentSkeleton = styled.div<SkeletonProps>`
  margin: ${({ size }) => `${size} ${size} 0 0`};
  width: 100%;
  height: 67px;
`;
