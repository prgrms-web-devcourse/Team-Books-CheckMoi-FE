import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StudyCard = styled(Card)`
  display: flex;

  padding: 1rem;
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
`;

export const StudyInfoConatiner = styled.div`
  width: 100%;

  padding: 1rem;

  overflow: hidden;
`;

interface ResponsiveTextProps {
  fontSize?: number;
}

export const ResponsiveText = styled.div<ResponsiveTextProps>`
  padding: 0.5rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${({ fontSize }) => `${fontSize}rem`};
`;
