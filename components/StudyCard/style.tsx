import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StudyCard = styled(Card)`
  display: flex;

  width: 100%;

  padding: 1rem;
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
`;

// TODO ellipsis 적용 안됨
export const StudyInfoConatiner = styled.div`
  display: block;

  padding: 1rem;

  flex-basis: 200px;

  &:first-child {
    font-size: 1.33rem;
  }
`;

export const ResponsiveText = styled.div`
  width: 100%;

  display: block;

  padding: 0.5rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
