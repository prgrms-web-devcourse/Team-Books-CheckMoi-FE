import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tabs, Tab, Button, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import type { GetServerSideProps } from "next/types";
import type { StudyDetailType } from "../../types/studyType";
import type { PostPropsType } from "../../types/postType";
import type { ApplicantMemberType } from "../../types/applicantType";
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
import {
  getApplicantMembers,
  putApplicantAcceptOrDeny,
} from "../../apis/applicant";

interface ServerSidePropType {
  studyData: StudyDetailType;
}

const STUDY_OWNER = 0;
const NOTICE_BOARD_TAB = 0;
const FREE_BOARD_TAB = 1;

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  // TODO 토큰 가져와서 API 요청하기
  const { study, members } = studyData;
  const userList = members.map((member) => {
    return member.user;
  });

  const router = useRouter();
  const { id: studyId, tabNumber: tabValue } = router.query;
  const currentTab = tabValue ? parseInt(tabValue as string, 10) : 0;

  const token =
    typeof document !== "undefined" ? document.cookie.split("=")[1] : "";

  const [tabNumber, setTabNumber] = useState(currentTab);
  const [postList, setPostList] = useState<Omit<PostPropsType, "onClick">[]>(
    []
  );
  const [applicantMemberList, setApplicantMemberList] = useState<
    ApplicantMemberType[]
  >([]);
  const [isOwner, setIsOwner] = useState(false);

  const { user } = useUserContext();

  const membersIdList = userList.map((member) => {
    return member.id;
  });

  useEffect(() => {
    if (user?.id === userList[STUDY_OWNER].id) setIsOwner(true);
    else setIsOwner(false);
  }, [user]);

  useEffect(() => {
    const getPostList = async () => {
      if (studyId) {
        const getList = await getPosts({ studyId: studyId as string });
        setPostList(getList.posts);
      }
    };

    const getApplicantMemberList = async () => {
      if (studyId) {
        const getList = await getApplicantMembers({
          studyId: studyId as string,
          token,
        });
        setApplicantMemberList(getList);
      }
    };

    getPostList();
    getApplicantMemberList();
  }, [studyId]);

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
    router.push(`/studyEdit/${studyId}`);
  };

  const onAccepted = async (memberId: string) => {
    const result = await putApplicantAcceptOrDeny({
      studyId: studyId as string,
      memberId,
      token,
      status: "ACCEPTED",
    });
    console.log("Accepted result", result);
  };
  const onDenied = async (memberId: string) => {
    const result = await putApplicantAcceptOrDeny({
      studyId: studyId as string,
      memberId,
      token,
      status: "DENIED",
    });
    console.log("Denied result", result);
  };

  return user && isStudyMember ? (
    <>
      <StudyDetailCard study={study} members={userList} />
      <S.TabsContainer>
        <Tabs value={tabNumber} onChange={handleTabChange}>
          <Tab label="공지" />
          <Tab label="자유" />
        </Tabs>
        <S.ButtonsWrapper>
          {isOwner && (
            <>
              <ApplicantList
                applicantList={applicantMemberList}
                onAccepted={onAccepted}
                onDenied={onDenied}
              />
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
        {postList.length !== 0 ? (
          <S.StyledUl>
            {postList?.map((post) => (
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
        ) : (
          <S.NoPost>
            <Typography>게시글이 없습니다. 게시글을 작성해주세요</Typography>
          </S.NoPost>
        )}
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
