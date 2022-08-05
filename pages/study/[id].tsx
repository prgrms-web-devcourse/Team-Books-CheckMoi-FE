import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next/types";
import type { StudyDetailType } from "../../types/studyType";
import { StudyDetailCard } from "../../components/StudyDetailCard";

// ANCHOR 회원 상세 보기 페이지에서 스터디 카드를 클릭하면 이곳으로 이동한다.
// ANCHOR 스터디 모집 (모달 or 페이지)에서 '스터디룸 이동하기'를 클릭하면 이곳으로 이동한다.
// NOTE 두 곳 모두 스터디 ID를 이곳으로 전달해야 한다.

// NOTE 스터디 ID를 사용해서 스터디 상세 정보를 조회할 수 있는 API가 없다?... 지금은 더미 데이터로
// TODO 스터디 정보를 사용해서 BookDetailCard를 만든다. (StudyDetailProps 타입 참고)
// TODO notice, article, free-talk, info(admin only) 탭을 만든다.
// TODO 각 탭의 디자인을 결정한다.

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const DummyBoard = () => {
  return (
    <div>
      <h1>Notice</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
        aspernatur voluptas doloribus quae perferendis asperiores quos eos, sint
        molestiae cum veniam maxime quisquam voluptate cupiditate facere atque
        nam tenetur necessitatibus?
      </p>
    </div>
  );
};

const DummyArticle = () => {
  return (
    <div>
      <h1>Article</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint id vel
        numquam assumenda magni amet asperiores quo voluptas tempore perferendis
        esse, officiis architecto vitae rem voluptate rerum consectetur in
        necessitatibus.
      </p>
    </div>
  );
};

const DummyFreeTalk = () => {
  return (
    <div>
      <h1>FreeTalk</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum molestias
        amet porro? Nemo dicta amet libero dolores. Ullam magnam, iste
        doloremque nihil sint ipsum, totam porro provident molestiae vero ad.
      </p>
    </div>
  );
};

const DummyInfo = () => {
  return (
    <div>
      <h1>Info</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
        temporibus odit voluptatum voluptatem eveniet ea nobis voluptas quisquam
        enim, modi libero? Dicta aliquid dolor optio quaerat sequi, corrupti
        ratione nihil?
      </p>
    </div>
  );
};

// NOTE SSR 실행하는 동안 API 호출 시 에러 발생 (콘솔)
//  CSR 실행하면서 에러 발생하지 않음
//  페이지를 새로고침 하지 않는 한 SSR 에러는 다시 발생하지 않음
// NOTE 2가지 옵션
//  1. SSR을 사용해서 서버에서 API 호출 후 페이지 컴포넌트로 전달(라우터로 이동하기 때문에 새로 API 호출 필요 없음)
//  2. SSR을 막는 옵션을 이 컴포넌트에 추가 (SSR을 생략함. 에러 발생하지 않음)
interface ServerSidePropType {
  studyData: StudyDetailType;
}

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  const [value, setValue] = useState(0);
  // const { study, members } = studyData; // 디스크립션이 들어있는데

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    /* TODO BookCard 컴포넌트가 Study Thumbnail 역할도 하는 건가? BookCard 컴포넌트의 src를 전달하기 위해서
       스터디 상세 정보에서 Thumbnail을 이곳으로 전달해야 한다.
    */
    // TODO 스터디 상세 정보에서 각 게시판 내용을 가져온다.
    <>
      {/* <StudyDetailCard study={study} members={members} /> */}

      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Notice" />
        <Tab label="Article" />
        <Tab label="Free-Talk" />
        <Tab label="Info(admin)" disabled />
      </Tabs>

      <TabPanel value={value} index={0}>
        <DummyBoard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DummyArticle />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DummyFreeTalk />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DummyInfo />
      </TabPanel>
    </>
  );
};

export default StudyDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const studyID = context.query.id;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/studies/${studyID}`
    );
    if (res.status === 200) {
      const studyData = res.data.data;
      return { props: { studyData } };
    }
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
};
