import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { StudyDetailCard } from "../../components/StudyDetailCard";

// ANCHOR 회원 상세 보기 페이지 스터디 카드를 클릭하면 이곳으로 이동한다.
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

const StudyDetailPage = () => {
  const router = useRouter();
  const studyID = router.query.id;
  useEffect(() => {
    // TODO studyID를 사용해서 스터디 상세 정보 요청 (StudyDetailProps 타입)
    // TODO 스터디 상세 정보에 Thumbnail이 있어야 한다.
  }, []);
  const [value, setValue] = useState(0);

  return (
    /* TODO BookCard 컴포넌트가 Study Thumbnail 역할도 하는 건가? BookCard 컴포넌트의 src를 전달하기 위해서
       스터디 상세 정보에서 image를 이곳으로 전달해야 한다.
    */
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
      <Tabs value={value}>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </>
  );
};

export default StudyDetailPage;
