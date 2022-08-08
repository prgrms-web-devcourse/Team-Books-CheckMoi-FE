import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import type { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import type { StudyDetailType } from "../../types/studyType";
import { TabPanel } from "../../components";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo } from "../../apis/study";
import { PostCard } from "../../components/PostCard";
import { DummyPost } from "../../commons/dummyPost";
import * as S from "../../styles/StudyDetailPageStyle";

interface ServerSidePropType {
  studyData: StudyDetailType;
}

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  // TODO router에 value query가 있으면 setValue로 실행.
  const router = useRouter();
  const { id: studyID, value: tabValue } = router.query;
  const currentTab = tabValue ? parseInt(tabValue as string, 10) : 0;

  const [tabNumber, setTabValue] = useState(currentTab);
  const { study, members } = studyData;
  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // TODO 게시글 클릭 시 value 값을 갖고 게시글 상세 페이지로 이동 확인
  // TODO API 연동 확인
  const handlePostClick = (id: number) => {
    router.push(`/boardDetail/${id}`, { query: { tabNumber } });
  };
  return (
    <>
      <StudyDetailCard study={study} members={members} />

      <Tabs value={tabNumber} onChange={handleTabChange}>
        <Tab label="공지" />
        <Tab label="자유" />
        <Tab label="관리자" disabled />
      </Tabs>
      <TabPanel value={tabNumber} index={0}>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList key={post.id}>
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList key={post.id}>
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
      <TabPanel value={tabNumber} index={2}>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList key={post.id}>
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
    </>
  );
};

export default StudyDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const studyID = context.query.id as string;
  const studyData = await getStudyDetailInfo(studyID);
  return { props: { studyData } };
};
