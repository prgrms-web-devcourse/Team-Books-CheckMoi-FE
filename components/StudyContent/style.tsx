import styled from "@emotion/styled";
import { Button, Card } from "@mui/material";

interface StudyContentType {
  height: string | number;
}

export const StudyContentContainer = styled(Card)`
  padding: 0 1rem;
  position: relative;
`;

export const StudyContent = styled.pre<StudyContentType>`
  min-height: ${({ height }) =>
    typeof height === "number" ? `${height}rem` : height};

  max-height: 30rem;
  margin-bottom: 1rem;

  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const StyleButton = styled(Button)`
  height: 2rem;
  float: right;
  margin-bottom: 1rem;
`;
