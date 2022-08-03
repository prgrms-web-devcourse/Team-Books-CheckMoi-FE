import styled from "@emotion/styled";
import Image from "next/image";

interface BookCardProps {
  size: number;
}

export const BookCard = styled.div<BookCardProps>`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size * 1.4}rem`};
  max-width: 30rem;
  max-height: 34rem;
  position: relative;

  cursor: pointer;
`;

export const ImageWrapper = styled.div<BookCardProps>`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size * 1.25}rem`};
  box-shadow: 12px 21px 15px -3px rgba(0, 0, 0, 0.1);

  max-width: 25rem;
  max-height: 31.25rem;
  position: relative;
`;

export const BookTitle = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
`;
