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
import * as S from "../../styles/StudyDetailStyle";

interface ServerSidePropType {
  studyData: StudyDetailType;
}

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  // TODO router에 value query가 있으면 setValue로 실행.
  const router = useRouter();
  const { id: studyID, value: tabValue } = router.query;
  const currentTab = tabValue ? parseInt(tabValue as string, 10) : 0;

  const [value, setValue] = useState(currentTab);
  const { study, members } = studyData;
  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // TODO 게시글 클릭 시 value 값을 갖고 게시글 상세 페이지로 이동 확인
  // TODO API 연동 확인
  const handlePostClick = (id: number) => {
    router.push(`/boardDetail/${id}`, { query: { value } });
  };
  return (
    <>
      <StudyDetailCard study={study} members={members} />

      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="공지" />
        <Tab label="자유" />
        <Tab label="관리자" disabled />
      </Tabs>
      <S.StyledTab>
        <TabPanel value={value} index={0}>
          <S.StyledUl>
            {DummyPost.map((post) => (
              <S.StyledList key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  size={post.size}
                  user={post.user}
                  onClick={() => {
                    handlePostClick(post.id);
                  }}
                />
              </S.StyledList>
            ))}
          </S.StyledUl>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <S.StyledUl>
            {DummyPost.map((post) => (
              <S.StyledList key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  size={post.size}
                  user={post.user}
                  onClick={() => {
                    handlePostClick(post.id);
                  }}
                />
              </S.StyledList>
            ))}
          </S.StyledUl>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <S.StyledUl>
            {DummyPost.map((post) => (
              <S.StyledList key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  size={post.size}
                  user={post.user}
                  onClick={() => {
                    handlePostClick(post.id);
                  }}
                />
              </S.StyledList>
            ))}
          </S.StyledUl>
        </TabPanel>
      </S.StyledTab>
    </>
  );
};

export default StudyDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const studyID = context.query.id as string;
  const studyData = await getStudyDetailInfo(studyID);
  return { props: { studyData } };
};
