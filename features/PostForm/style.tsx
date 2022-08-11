import styled from "@emotion/styled";
import { Select, TextField, Button } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
`;

export const Title = styled.div`
  display: flex;
`;

export const StyledSelect = styled(Select)`
  width: 10rem;
  height: 3rem;
  margin-right: 1rem;
`;

export const StyledTextField = styled(TextField)`
  justify-content: flex-end;
`;

export const StyledButton = styled(Button)`
  width: 6rem;
  margin-left: auto;
  white-space: nowrap;
`;