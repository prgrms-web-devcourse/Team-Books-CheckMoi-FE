import styled from "@emotion/styled";
import { Card, MenuItem, AvatarGroup, Typography } from "@mui/material";

export const StudyDetailCard = styled(Card)`
  display: flex;
  padding: 1rem;
  flex-direction: row;
  position: relative;
  @media (max-width: 512px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  & span {
    margin: 0;
    padding: 0;
    display: inline !important;
  }
  @media (max-width: 512px) {
    box-shadow: -12px 17px 16px 3px rgba(0, 0, 0, 0.1),
      13px 0px 15px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const StudyInfoContainer = styled.div`
  width: 100%;
  padding: 1rem;
  overflow: hidden;
`;

export const StyledAvatarGroup = styled(AvatarGroup)`
  height: 100%;

  @media (max-width: 512px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  & span {
    margin-left: 1rem;
  }
`;

export const StyledTypograph = styled(Typography)`
  font-size: 1.25rem;
`;

interface ResponsiveTextProps {
  fontSize?: number;
}

export const ResponsiveText = styled.div<ResponsiveTextProps>`
  padding: 0.5rem;
  font-size: ${({ fontSize }) => `${fontSize}rem`};
`;
