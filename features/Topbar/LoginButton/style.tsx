import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const KakaoButton = styled(Button)`
  background-color: yellow;

  &:hover {
    background-color: yellow;
  }
`;
