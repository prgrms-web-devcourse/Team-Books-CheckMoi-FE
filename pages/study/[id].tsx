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

  // TODO PostCard를 몇 개씩 보여줄지 웹에서 가로 3개? 모바일에서 2개? 스타일 필요.
  // TODO 게시글 클릭 시 value 값을 갖고 게시글 상세 페이지로 이동
  // TODO 실제 API로 전달 받아서 map 실행 해야 함. map에서 key를 어떤 것으로 사용할지
  const handlePostClick = (id: number) => {
    router.push(`/postDetail/${id}`, { query: { value } });
  };
  return (
    <>
      <StudyDetailCard study={study} members={members} />

      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="공지" />
        <Tab label="자유" />
        <Tab label="관리자" disabled />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ul>
          {DummyPost.map((post) => (
            <li key={post.id}>
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
            </li>
          ))}
        </ul>
        {/* <PostCard
          id={1}
          title={DummyPost.title}
          content={DummyPost.content}
          createdAt={DummyPost.createdAt}
          comments={DummyPost.comments}
          size={DummyPost.size}
          user={DummyPost.user}
          onClick={() => {
            handlePostClick();
          }}
        /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* { <PostCard
          id={2}
          title={DummyPost.title}
          content={DummyPost.content}
          createdAt={DummyPost.createdAt}
          comments={DummyPost.comments}
          size={DummyPost.size}
          user={DummyPost.user}
          onClick={() => {
            handlePostClick();
          }} 
        /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <PostCard
          id={3}
          title={DummyPost.title}
          content={DummyPost.content}
          createdAt={DummyPost.createdAt}
          comments={DummyPost.comments}
          size={DummyPost.size}
          user={DummyPost.user}
          onClick={() => {
            handlePostClick();
          }}
        /> */}
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
