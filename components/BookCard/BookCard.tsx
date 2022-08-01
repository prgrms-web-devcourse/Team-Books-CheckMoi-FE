import React from "react";
import Image from "next/image";
import * as S from "./style";

interface BookCardProps {
  src: string;
  title: string;
  size: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const BookCard = ({ src, title, size, onClick }: BookCardProps) => {
  return (
    <S.BookCard onClick={onClick} size={size}>
      <S.ImageWrapper size={size}>
        <Image src={src} layout="fill" />
      </S.ImageWrapper>
      <S.BookTitle>{title}</S.BookTitle>
    </S.BookCard>
  );
};
