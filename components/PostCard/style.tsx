import styled from "@emotion/styled";

interface PostCardProps {
  size: number;
}

export const PostCard = styled.div<PostCardProps>`
  width: ${({ size }) => `${size}rem`};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  box-shadow: 12px 21px 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const PostTitle = styled.div`
  font-weight: bold;
  font-size: large;
`;

export const PostContent = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 3.5rem;
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

export const PostUserWarpper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
