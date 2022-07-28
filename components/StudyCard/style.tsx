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

export const ResponsiveTextWrapper = styled.div`
  font-size: 1.3rem;
`;
export const ResponsiveText = styled.div`
  padding: 0.5rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
