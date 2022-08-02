import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { StudyDetailCard } from "../../components/StudyDetailCard";

// ANCHOR 회원 상세 보기 페이지에서 스터디 카드를 클릭하면 이곳으로 이동한다.
// ANCHOR 스터디 모집 (모달 or 페이지)에서 '스터디룸 이동하기'를 클릭하면 이곳으로 이동한다.
// NOTE 두 곳 모두 스터디 ID를 이곳으로 전달해야 한다.

// NOTE 스터디 ID를 사용해서 스터디 상세 정보를 조회할 수 있는 API가 없다?... 지금은 더미 데이터로
// TODO 스터디 정보를 사용해서 BookDetailCard를 만든다. (StudyDetailProps 타입 참고)
// TODO notice, article, free-talk, info(admin only) 탭을 만든다.
// TODO 각 탭의 디자인을 결정한다.

const DUMMY_DATA = {
  title: "모던 자바스크립트 같이 하실분?",
  member: [
    {
      userId: "string",
      name: "string",
      email: "string",
      img: "https://picsum.photos/200",
    },
    {
      userId: "string2",
      name: "string",
      email: "string",
      img: "https://picsum.photos/200",
    },
    {
      userId: "string3",
      name: "string",
      email: "string",
      img: "string",
    },
  ],
  gatherStartDate: "2022/6/30",
  gatherEndDate: "2022/7/30",
  studyStartDate: "2022/7/2",
  studyEndDate: "2022/9/2",
  maxParticipant: 16,
  currentParticipant: 0,
};

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

const StudyDetailPage = () => {
  const router = useRouter();
  const studyID = router.query.id;
  useEffect(() => {
    // TODO studyID를 사용해서 스터디 상세 정보 요청 (StudyDetailProps 타입)
    // TODO 스터디 상세 정보에 Thumbnail이 있어야 한다.
  }, []);
  const [value, setValue] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    /* TODO BookCard 컴포넌트가 Study Thumbnail 역할도 하는 건가? BookCard 컴포넌트의 src를 전달하기 위해서
       스터디 상세 정보에서 Thumbnail을 이곳으로 전달해야 한다.
    */
    // TODO 스터디 상세 정보에서 각 게시판 내용을 가져온다.
    <>
      <StudyDetailCard
        title={DUMMY_DATA.title}
        member={DUMMY_DATA.member}
        gatherStartDate={DUMMY_DATA.gatherStartDate}
        gatherEndDate={DUMMY_DATA.gatherEndDate}
        studyStartDate={DUMMY_DATA.studyStartDate}
        studyEndDate={DUMMY_DATA.studyEndDate}
        maxParticipant={DUMMY_DATA.maxParticipant}
        currentParticipant={DUMMY_DATA.currentParticipant}
      />
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
