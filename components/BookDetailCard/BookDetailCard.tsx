import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import * as S from "./style";
import { LoginRequestModal } from "../../features/LoginRequestModal/LoginRequestModal";

interface BookDetailProps {
  id: number;
  size: number;
  src: string;
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

// TODO Image => future Image로 수정해야 함
export const BookDetail = ({
  id = 0,
  size = 208,
  src = "",
  title = "",
  author = "",
  publisher = "",
  pubdate = "",
  isbn = "",
  description = "",
}: BookDetailProps) => {
  const { user } = useUserContext();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleStudyCreateBtnClick = () => {
    if (!user) setOpenModal(true);
    else router.push(`/studyOpen/${id}`);
  };

  const handleOnCloseClick = () => {
    setOpenModal(false);
  };

  return (
    <S.BookDetailCard>
      <S.ImageContainer>
        <S.ImageWrapper>
          <Image width={size} height={size * 1.5} src={src} />
        </S.ImageWrapper>
        <S.StyledButton
          variant="contained"
          color="primary"
          onClick={handleStudyCreateBtnClick}
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
      <LoginRequestModal.Container
        open={openModal}
        onClose={handleOnCloseClick}
      >
        <LoginRequestModal.Title>
          스터디 개설을 위해 로그인이 필요합니다
        </LoginRequestModal.Title>
        <LoginRequestModal.Content>
          로그인을 하시겠습니까?
        </LoginRequestModal.Content>
      </LoginRequestModal.Container>
    </S.BookDetailCard>
  );
};
