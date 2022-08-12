import * as S from "./style";

export const HomeUI = () => {
  return (
    <S.Container>
      <S.HomeUIContent>
        <h1>책은 마음의 양식이다</h1>
        <h1>혼자 독서 공부가 어려운 당신에게 스터디를</h1>
      </S.HomeUIContent>
      <S.HomeUIContent>
        <S.HomeUIBook1 src="/images/main_book_1.jpeg" alt="" />
        <S.HomeUIBook2 src="/images/main_book_2.jpeg" alt="" />
        <S.HomeUIBook3 src="/images/main_book_3.jpeg" alt="" />
      </S.HomeUIContent>
    </S.Container>
  );
};
