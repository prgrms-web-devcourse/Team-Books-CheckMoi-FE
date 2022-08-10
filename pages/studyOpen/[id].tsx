import { useRouter } from "next/router";
import React from "react";
import { StudyOpen } from "../../features";
import * as S from "../../styles/StudyOpenPageStyle";

const StudyOpenPage = () => {
  const router = useRouter();
  const bookId = router.query.id as string;

  return (
    <S.PageContainer>
      <StudyOpen bookId={bookId} />
    </S.PageContainer>
  );
};

export default StudyOpenPage;
