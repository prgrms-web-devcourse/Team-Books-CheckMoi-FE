import styled from "@emotion/styled";
import { Avatar, Button, Divider } from "@mui/material";

export const UserProfileContainer = styled.div`
  height: 8rem;
  max-width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 512px) {
    max-width: 90%;
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 5rem;
  height: 5rem;
  @media (max-width: 512px) {
    width: 4rem;
    height: 4rem;
  }
`;

export const User = styled.div`
  width: 60%;
  padding: 1rem;
`;

export const UserName = styled.div`
  padding-bottom: 0.3rem;
  font-size: 1.2rem;
`;

export const UserInfo = styled.div`
  font-size: 0.9rem;
`;

export const StyledButton = styled(Button)`
  width: 7rem;
  height: 2rem;
  white-space: nowrap;
`;

export const StyledDivider = styled(Divider)`
  width: 70%;
  margin: auto;
  border-color: lightgray;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

export const StudyContainer = styled.div`
  width: 70%;
  margin: 1rem auto;
  @media (max-width: 512px) {
    width: 90%;
  }
`;
