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
import { ApplicantList } from "../../features/ApplicantList";
import { NoAccess } from "../../components/NoAccess";
import { getPosts } from "../../apis/post";
import type { ResponsePostType } from "../../types/postType";

interface ServerSidePropType {
  studyData: StudyDetailType;
}

const STUDY_OWNER = 0;
const NOTICE_BOARD_TAB = 0;
const FREE_BOARD_TAB = 1;

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  // TODO 토큰 가져와서 API 요청하기

  const { study, members } = studyData;
  const token =
    typeof document !== "undefined" ? document.cookie.split("=")[1] : "";

  const router = useRouter();
  const { id: studyId, tabNumber: tabValue } = router.query;
  const currentTab = tabValue ? parseInt(tabValue as string, 10) : 0;
  const [tabNumber, setTabNumber] = useState(currentTab);

  const [postList, setPostList] = useState<ResponsePostType[]>([]);

  const [isOwner, setIsOwner] = useState(false);

  const { user } = useUserContext();
  const membersIdList = members.map((member) => {
    return member.id;
  });

  useEffect(() => {
    if (user?.id === members[STUDY_OWNER].id) setIsOwner(true);
    else setIsOwner(false);
  }, [user]);

  useEffect(() => {
    const getPostLists = async () => {
      if (studyId) {
        const getList = await getPosts({ studyId: studyId as string, token });
        console.log("postList", postList);
        setPostList(getList);
      }
    };
    getPostLists();
  }, []);

  const isStudyMember = membersIdList.includes(user?.id as string);

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  const handlePostClick = (id: number) => {
    router.push({
      pathname: `/post/${id}`,
      query: { tabNumber, studyId },
    });
  };

  const handleWriteButtonClick = () => {
    router.push(`/postCreate`, { query: { tabNumber } });
  };

  const handleStudyEditButtonClick = () => {
    // TODO: 수정 페이지
  };

  return user && isStudyMember ? (
    <>
      <StudyDetailCard study={study} members={members} />
      <S.TabsContainer>
        <Tabs value={tabNumber} onChange={handleTabChange}>
          <Tab label="공지" />
          <Tab label="자유" />
        </Tabs>
        <S.ButtonsWrapper>
          {isOwner && (
            <>
              <ApplicantList />
              <Button variant="contained" onClick={handleStudyEditButtonClick}>
                스터디 정보 수정
              </Button>
            </>
          )}
          {tabNumber === NOTICE_BOARD_TAB && !isOwner ? (
            ""
          ) : (
            <Button variant="contained" onClick={handleWriteButtonClick}>
              글 작성
            </Button>
          )}
        </S.ButtonsWrapper>
      </S.TabsContainer>

      <TabPanel value={tabNumber} index={NOTICE_BOARD_TAB}>
        <S.StyledUl>
          {postList.map((post) => (
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
      <TabPanel value={tabNumber} index={FREE_BOARD_TAB}>
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
  ) : user ? (
    <NoAccess
      title="이 페이지는 스터디에 참여한 사용자만 이용할 수 있습니다."
      description="스터디에 참가 신청을 하시기 바랍니다."
    />
  ) : (
    <NoAccess
      title="이 페이지는 로그인한 사용자만 이용할 수 있습니다."
      description="책모이에 로그인하시면 다양한 서비스를 이용하실 수 있습니다."
    />
  );
};

export default StudyDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const studyID = context.query.id as string;
  const studyData = await getStudyDetailInfo(studyID);
  return { props: { studyData } };
};
