import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "../../styles/StudyOpenPageStyle";
import { StudyOpen as StudyEdit } from "../../features";
import { getStudyDetailInfo } from "../../apis/study";
import type { StudyDetailType } from "../../types/studyType";

const StudyEditPage = () => {
  const [studyDetailInfo, setStudyDetailInfo] = useState({} as StudyDetailType);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const studyId = Number(router.query.id as string);

  useEffect(() => {
    const fetchStudyInfo = async () => {
      const data = await getStudyDetailInfo(studyId);

      setStudyDetailInfo(data);
      setLoading(false);
    };

    fetchStudyInfo();
  }, []);

  if (loading) return <div />;

  return (
    <S.PageContainer>
      <StudyEdit bookId={studyDetailInfo?.book?.id} studyId={studyId} />
    </S.PageContainer>
  );
};

export default StudyEditPage;
