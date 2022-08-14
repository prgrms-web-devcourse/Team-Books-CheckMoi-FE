import useWindowSize from "../../hooks/useWindowSize";
import * as S from "./style";

export const HomeUI = () => {
  const { width } = useWindowSize();

  return (
    <S.Container>
      <S.HomeUITextContainer>
        <h1>책을 모이삼아 살아가는</h1>
        <h1>CheckMoi와 함께</h1>
        <h1>스터디를 개설해보세요</h1>
      </S.HomeUITextContainer>
      <S.HomeUIContent>
        <S.HomeUIBook1 src="/images/main_book_1.jpeg" alt="" />
        {width > 900 && <S.HomeUIBook2 src="/images/main_book_2.jpeg" alt="" />}
        {width > 1240 && (
          <S.HomeUIBook3 src="/images/main_book_3.jpeg" alt="" />
        )}
      </S.HomeUIContent>
    </S.Container>
  );
};
