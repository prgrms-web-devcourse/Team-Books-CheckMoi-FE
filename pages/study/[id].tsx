import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import type { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import type { StudyDetailType } from "../../types/studyType";
import { TabPanel } from "../../components";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo } from "../../apis/study";
import { PostCard } from "../../components/PostCard";
import { DummyPost } from "../../commons/dummyPost";
import { useUserContext } from "../../hooks/useUserContext";
import * as S from "../../styles/StudyDetailPageStyle";

interface ServerSidePropType {
  studyData: StudyDetailType;
}

// TODO ContextAPI로 User 정보 가져오기
// TODO studyID로 Study 정보 요청하기
// TODO 게시글 작성 버튼
// TODO User가 스터디장일 경우와 아닐 경우 탭, 버튼 권한 부여

const STUDY_OWNER = 0;

const writeButton = (
  tabNumber: number,
  isOwner: boolean,
  onButtonClick: () => void
) => {
  if (tabNumber !== 2)
    if (tabNumber === 0) {
      if (isOwner)
        return (
          <Button variant="contained" onClick={onButtonClick}>
            글 작성
          </Button>
        );
    } else
      return (
        <Button variant="contained" onClick={onButtonClick}>
          글 작성
        </Button>
      );

  return "";
};

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  const { study, members } = studyData;

  const router = useRouter();
  const { id: studyId, tabNumber: tabValue } = router.query;
  console.log("query", router.query);
  const currentTab = tabValue ? parseInt(tabValue as string, 10) : 0;
  const [tabNumber, setTabNumber] = useState(currentTab);

  const [isOwner, setIsOwner] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    if (user?.id === members[STUDY_OWNER].id) setIsOwner(true);
    else setIsOwner(false);
  }, [user]);

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  const handlePostClick = (id: number) => {
    router.push({
      pathname: `/post/${id}`,
      query: { tabNumber, studyId },
    });
  };

  const handleButtonClick = () => {
    router.push({
      pathname: `/postCreate`,
      query: { tabNumber },
    });
  };

  return (
    <>
      <StudyDetailCard study={study} members={members} />
      <S.TabsWrapper>
        <Tabs value={tabNumber} onChange={handleTabChange}>
          <Tab label="공지" />
          <Tab label="자유" />
          {isOwner && <Tab label="관리자" />}
        </Tabs>
        {writeButton(tabNumber, isOwner, handleButtonClick)}
      </S.TabsWrapper>
      {/* TODO 더미 데이터 사용중 교체 예정 */}
      <TabPanel value={tabNumber} index={0}>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList
              key={post.id}
              onClick={() => {
                handlePostClick(+post.id);
              }}
            >
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList
              key={post.id}
              onClick={() => {
                handlePostClick(+post.id);
              }}
            >
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
      <TabPanel value={tabNumber} index={2}>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList
              key={post.id}
              onClick={() => {
                handlePostClick(+post.id);
              }}
            >
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
