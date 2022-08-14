import { Menu, Divider } from "@mui/material";
import styled from "@emotion/styled";

export const StyledMenu = styled(Menu)`
  & ul {
    min-width: 10rem;
    max-width: 20rem;
  }
`;

export const AvatarWrapper = styled("div")`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-size: 1.2rem;

  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const StyledUserInfo = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const SmallSpan = styled("span")`
  font-size: 0.5rem;
`;

export const StyledDivider = styled(Divider)`
  text-align: center;
  margin: 0.5rem 1rem;
`;

export const LogoutButtonWrapper = styled("div")`
  display: flex;
  justify-content: end;
  padding-right: 1rem;
`;

export const ButtonContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;
