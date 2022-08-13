import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/router";
import type { BookType } from "../../types/bookType";
import * as S from "./style";

interface BookDetailProps {
  size: number;
  book: BookType;
}

// TODO Image => future Image로 수정해야 함
export const BookDetail = ({ size = 208, book }: BookDetailProps) => {
  const {
    id: bookId,
    image,
    title,
    author,
    publisher,
    pubdate,
    isbn,
    description,
  } = book;
  const router = useRouter();

  const handleStudyOpenClick = () => {
    router.push(`/studyOpen/${bookId}`);
  };

  return (
    <S.BookDetailCard>
      <S.ImageContainer>
        <S.ImageWrapper>
          <Image width={size} height={size * 1.5} src={image} />
        </S.ImageWrapper>
        <S.StyledButton
          variant="contained"
          color="primary"
          onClick={handleStudyOpenClick}
        >
          스터디 개설하기
        </S.StyledButton>
      </S.ImageContainer>
      <S.BookInfoConatiner>
        <S.ResponsiveText fontSize={1.3}>{title}</S.ResponsiveText>
        <S.ResponsiveText>
          저자: {author} | 출판사: {publisher}
        </S.ResponsiveText>
        <S.ResponsiveText>출판일자: {pubdate}</S.ResponsiveText>
        <S.ResponsiveText>ISBN: {isbn}</S.ResponsiveText>
        <S.BookDescription>
          책소개
          <br />
          {description}
        </S.BookDescription>
      </S.BookInfoConatiner>
    </S.BookDetailCard>
  );
};
