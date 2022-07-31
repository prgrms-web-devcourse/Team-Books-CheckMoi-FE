import styled from "@emotion/styled";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";

export const BookDetailCard = styled(Card)`
  display: flex;
  padding: 1rem;

  flex-direction: row;
  position: relative;

  @media (max-width: 600px) {
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
  @media (max-width: 600px) {
    box-shadow: -12px 17px 16px 3px rgba(0, 0, 0, 0.1),
      13px 0px 15px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const BookInfoConatiner = styled.div`
  width: 100%;
  padding: 1rem;
  overflow: hidden;
`;

interface ResponsiveTextProps {
  fontSize?: number;
}

export const ResponsiveText = styled.div<ResponsiveTextProps>`
  padding: 0.5rem;

  overflow: hidden;
  font-size: ${({ fontSize }) => `${fontSize}rem`};
`;

export const BookDescription = styled.div<ResponsiveTextProps>`
  padding: 0.5rem;
  height: 8rem;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  overflow: auto;

  font-size: ${({ fontSize }) => `${fontSize}rem`};
`;

export const StyleButton = styled(Button)`
  min-width: 9rem;
  max-height: 2rem;
  position: absolute;
  right: 2rem;
  top: 1rem;

  @media (max-width: 600px) {
    position: relative;
    margin-bottom: 1rem;
  }
`;
