import styled from "@emotion/styled";
import { Button, Card } from "@mui/material";

export const StudyContentContainer = styled(Card)`
  padding: 0 1rem;
  position: relative;
`;

export const StudyContent = styled.pre`
  min-height: 10rem;
  max-height: 30rem;
  overflow: auto;
  margin-bottom: 1rem;

  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const StyleButton = styled(Button)`
  height: 2rem;
  float: right;

  @media (max-width: 512px) {
    margin-bottom: 1rem;
  }
`;
