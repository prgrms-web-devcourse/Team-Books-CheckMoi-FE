import React from "react";
import Image from "next/image";
import * as S from "./style";

interface BookCardProps {
  id: number;
  src: string;
  title: string;
  size: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const BookCard = ({ id, src, title, size, onClick }: BookCardProps) => {
  const handleClick = () => {
    // console.log("id", id);
  };
  return (
    <S.BookCard onClick={handleClick} size={size}>
      <S.ImageWrapper size={size}>
        <Image src={src} layout="fill" />
      </S.ImageWrapper>
      <S.BookTitle>{title}</S.BookTitle>
    </S.BookCard>
  );
};
