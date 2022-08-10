import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 512px) {
    width: 90%;
  }
`;

export const StudyCardContainer = styled.div`
  overflow: auto;
`;

export const NotStudy = styled.div`
  margin: 1rem;
  text-align: center;
`;
