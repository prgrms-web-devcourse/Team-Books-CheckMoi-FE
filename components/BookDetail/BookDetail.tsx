import Image from "next/image";
import * as S from "./style";

interface BookDetailProps {
  size: number;
  src: string;
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

export const BookDetail = ({
  size = 208,
  src = "https://picsum.photos/200",
  title = "책 제목",
  author = "000",
  publisher = "000",
  pubdate = "2020년 08월 01일",
  isbn = "0000000000000",
  description = "대한민국을 대표하는 작가 김진명의 첫 에세이 『때로는 행복 대신 불행을 택하기도 한다』가 이타북스에서 출간되었다. 작가가 살아가는 동안 느끼고 겪은 바를 다섯 가지 갈래로 엮어 구성한 이 책은, 주제와 분야를 막론하고 수많은 베스트셀러 소설을 집필해 온 김진명의 깊은 통찰력으로, 독자 스스로 내면에는 어떤 힘이 있는가를 고민해 보게 하는 낯설고도 반가운 창이 되어줄 것이다. 때로는 행복 대신 불행을 택하기도 한다』는 얼핏 지루하게 들릴 수도 있는, 그러나 우리 삶을 지탱하는 진리와도 같은 말을 흥미로우면서도 의미 있는 일화들에 녹여 넣어 친근하고 흥미롭게 독자를 생각의 길로 안내한다.",
}: BookDetailProps) => {
  return (
    <S.StudyCard>
      <S.ImageWrapper>
        <Image width={size} height={size * 1.5} src={src} />
      </S.ImageWrapper>
      <S.StudyInfoConatiner>
        <S.ResponsiveText fontSize={1.3}>{title}</S.ResponsiveText>
        <S.ResponsiveText>
          저자: {author} | 출판사: {publisher}
        </S.ResponsiveText>
        <S.ResponsiveText>
          출판일자: {pubdate}
        </S.ResponsiveText>
        <S.ResponsiveText>
         ISBN: {isbn}
        </S.ResponsiveText>
        <S.ResponsiveText>
          책소개
          <br/>
          {description}
        </S.ResponsiveText>
      </S.StudyInfoConatiner>
    </S.StudyCard>
  );
};
