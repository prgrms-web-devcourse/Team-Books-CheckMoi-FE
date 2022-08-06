import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import type { GetServerSideProps } from "next/types";
import type { StudyDetailType } from "../../types/studyType";
import { TabPanel } from "../../components";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo } from "../../apis/study";

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

interface ServerSidePropType {
  studyData: StudyDetailType;
}

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  const [value, setValue] = useState(0);
  const { study, members } = studyData;
  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <DummyBoard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DummyArticle />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DummyFreeTalk />
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
