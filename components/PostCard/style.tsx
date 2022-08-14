import styled from "@emotion/styled";
import { Badge } from "@mui/material";

export const PostCard = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0;
  border: 0.5px solid #f9f9f9;
  box-shadow: 12px 21px 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const PostTitle = styled.div`
  font-weight: bold;
  font-size: large;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PostContent = styled.pre`
  padding-top: 0.5rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5rem;
  height: 5rem;
`;

export const PostCreatedAt = styled.div`
  margin: 0.5rem 0;
  font-size: small;
`;

export const PostBottomContainer = styled.div`
  padding: 0 1rem 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

export const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    top: 2px;
  }
`;

export const PostUserWarpper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PostCardWriterSkeleton = styled.div`
  flex-shrink: 0;
  width: 10rem;
  height: 19px;
`;
