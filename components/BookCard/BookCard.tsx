import React from "react";
import Image from "next/image";
import * as S from "./style";

interface BookCardProps {
  src: string;
  title: string;
  width: number;
  height: number;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export const BookCard = ({
  src,
  title,
  width,
  height,
  onClick,
}: BookCardProps) => {
  return (
    <S.BookCard onClick={onClick} width={width} height={height}>
      <Image src={src} width={width} height={height} layout="responsive" />
      <S.BookTitle>{title}</S.BookTitle>
    </S.BookCard>
  );
};
