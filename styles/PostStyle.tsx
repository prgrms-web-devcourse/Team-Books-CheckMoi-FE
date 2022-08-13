import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

export const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  height: 2rem;
  margin-top: 1rem;
  margin-left: auto;
  gap: 1rem;
`;

export const BoardTitleContainer = styled.div`
  display: flex;
`;

export const BoardTitle = styled.div`
  margin: 1rem 0;
  font-size: 2rem;
`;

export const BoardInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

export const StyledAvatar = styled(Avatar)`
  width: 2rem;
  height: 2rem;
`;

export const AvatarName = styled.div`
  padding: 0 0.5rem;
  font-size: 0.85rem;
  font-weight: bold;
`;

export const BoardCreateDate = styled.div`
  padding: 0 0.5rem;
  color: gray;
  font-size: 0.85rem;
`;

export const BoardContent = styled.div`
  padding: 1rem 0;
`;
