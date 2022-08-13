import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  /* box-shadow: 12px 21px 15px -3px rgba(0, 0, 0, 0.1); */
  border: 1px solid #d7d7d7;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;

export const UserWrapper = styled.div`
  align-self: center;
  flex-shrink: 1;
  padding: 0.5rem 1rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  flex-shrink: 2;
  width: 100%;
  overflow: auto;
  gap: 0.5rem;
`;

export const StyledMenu = styled.div`
  flex-shrink: 1;
  right: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-size: 0.5rem;
    color: #a9a9a9;
  }
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
