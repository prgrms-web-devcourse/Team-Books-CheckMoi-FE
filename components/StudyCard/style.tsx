import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StudyCard = styled(Card)`
  display: flex;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.01) translateY(-10px);
  }
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  @media (max-width: 512px) {
    width: 0;
    height: 0;
  }
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
  @media (max-width: 320px) {
    font-size: 0.8rem;
  }
`;

interface StudyThumbnailSkeletonProps {
  width: number;
  height: number;
}

export const StudyThumbnailSkeleton = styled.div<StudyThumbnailSkeletonProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

interface StudyInfoSkeletonProps {
  width: string;
  height: string;
}

export const StudyInfoSkeleton = styled.div<StudyInfoSkeletonProps>`
  padding: 0.5rem;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
