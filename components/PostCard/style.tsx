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
`;

export const PostCreatedAt = styled.div`
  font-size: small;
`;

export const PostBottomContainer = styled.div`
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostUserWarpper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
