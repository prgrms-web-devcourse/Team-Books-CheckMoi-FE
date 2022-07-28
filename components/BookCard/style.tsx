import styled from "@emotion/styled";

interface BookCardProps {
  width: number;
  height: number;
}

export const BookCard = styled.div<BookCardProps>`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  box-shadow: 12px 21px 15px -3px rgba(0,0,0,0.1);
`;

export const BookTitle = styled.p`
  text-align: center;
`;
