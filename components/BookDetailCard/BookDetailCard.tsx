import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useUserActionContext,
  useUserContext,
} from "../../hooks/useUserContext";
import * as S from "./style";
import { LoginRequestModal } from "../../features/LoginRequestModal/LoginRequestModal";
import { apiClient } from "../../apis/api";

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
  src = "https://picsum.photos/200",
  title = "책 제목",
  author = "000",
  publisher = "000",
  pubdate = "2020년 08월 01일",
  isbn = "0000000000000",
  description = "내가 죽으면 시신은 누가 처리해주지?혼자 죽게 될까 봐 걱정인 사람들. 그들을 위해 해법을 제시하는 인문서세계적인 석학이자 사회학자, 일본 페미니즘계의 대모 격인 우에노 지즈코의 2021년 화제작, 『집에서 혼자 죽기를 권하다』(원제: 在宅ひとり死のススメ)가 동양북스에서 출간되었다. 저자 우에노 지즈코는 “살아 있는 동안 고립되지 않는다면 고독사를 두려워할 필요가 없다”고 말하며 최근 10년 동안 노후에 대한 상식이 180도 바뀌었다는 사실을 강조한다. 과거에는 ‘자녀와 함께 사는 것이 당연한 것’이었지만 지금은 ‘함께 살지 않는 것이 현명한 것’이라고 사고관이 180도 바뀌고 있다는 것이다. 그러다 보니 혼자 사는 노인에 대한 시선도 ‘불쌍하다’에서 ‘편해 보인다’로 이동하고 있다는 것이 그녀의 주장이다. 오히려 가장 불행한 사람은 ‘혼자 사는 사람’이 아니라 ‘마음이 맞지 않는 사람과 같이 사는 사람’이라는 것이다. 특히 60대 이상 여성의 경우, 혼자 살 때 오히려 행복지수가 수직 상승한다.저자는 1인 가구의 행복지수(생활 만족도)가 2인 가구의 그것보다 훨씬 높다는 것, 자살률도 1인 가구보다 오히려 2인 가구가 높다는 것, 노후의 행복지수는 자녀의 유무와는 관계없다는 것, 요양 시설이나 병원에서 죽기 원하는 사람은 의외로 없다는 것 등등을 각종 통계 자료와 설문 조사 결과를 통해 증명해 보인다. 자신이 살던 집에서 편안하게 죽는 것이 가장 현명하다는 결론이다. 그렇다면 병에 걸리거나 돌봐줄 사람이 필요 불가결할 때는 어떻게 해야 할까? 이때 이용해야 할 것이 바로 국가에서 운영하는 간병 보험(우리나라의 장기요양보험) 제도다. 저자는 간병 보험이 생긴 이후 ‘돌봄 노동’이 무료가 아니라는 것이 상식으로 자리 잡았다면서 이미 70~80% 이상의 노인이 간병 보험의 도움을 받고 있다고 말한다. 간병이 필요하다는 인정만 받으면 케어 매니저(우리나라의 경우 요양보호사)가 일주일에 두 번이라도 방문 간병을 하게 되고 그렇게 되면 ‘고독사’를 걱정할 필요가 없다는 것이다. 이 책은 고령화 시대의 가장 큰 관심사인 ‘어떻게 죽는 것이 가장 행복하고 평화로운지’에 대한 화두를 던져 사회과학 도서로는 이례적으로 아마존 종합 1위에 올랐고 현재까지 20만 부가 넘게 판매되었다. 또한 이 책을 포함한 저자의 ‘나 혼자 시리즈’는 현지에서 누적 130만 부가 판매된 초베스트셀러이다.",
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
