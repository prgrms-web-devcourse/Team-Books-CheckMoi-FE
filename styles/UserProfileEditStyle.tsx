import styled from "@emotion/styled";
import { Avatar, Button, TextField } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UserProfileImage = styled.div`
  margin: 1rem;
`;

export const StyledAvatar = styled(Avatar)`
  width: 10rem;
  height: 10rem;
`;
export const SmallAvatar = styled(Avatar)`
  width: "2.5rem";
  height: "2.5rem"
`;

export const StyledTextField = styled(TextField)`
  width: 80%;
  max-width: 37.5rem;
  margin: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const StyledButton = styled(Button)`
  width: 7rem;
  height: 2rem;
  margin: 1rem;
  white-space: nowrap;
`;