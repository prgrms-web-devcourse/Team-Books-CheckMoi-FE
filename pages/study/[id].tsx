import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tabs, Tab, Button, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import type { GetServerSideProps } from "next/types";
import type { StudyDetailType } from "../../types/studyType";
import type { PostsType } from "../../types/postType";
import type { ApplicantMemberType } from "../../types/applicantType";
import { TabPanel } from "../../components";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { PostCard } from "../../components/PostCard";
import { useUserContext } from "../../hooks/useUserContext";
import * as S from "../../styles/StudyDetailPageStyle";
import { NoAccess } from "../../components/NoAccess";
import { getPosts } from "../../apis/post";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import { getStudyDetailInfo } from "../../apis/study";
import { ApplicantList } from "../../features/ApplicantList";
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
  const { study, members } = studyData;
  const userList = members.map((member) => {
    return member.user;
  });

  const router = useRouter();
  const { tabNumber: tabValue } = router.query;
  const studyId = Number(router.query.id as string);
  const currentTab = tabValue ? parseInt(tabValue as string, 10) : 0;

  const [tabNumber, setTabNumber] = useState(currentTab);
  const [applicantMemberList, setApplicantMemberList] = useState<
    ApplicantMemberType[]
  >([]);
  const [noticePostList, setNoticePostList] = useState<PostsType[]>([]);
  const [generalPostList, setGeneralPostList] = useState<PostsType[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  const { user } = useUserContext();
  const { renderSnackbar } = useOurSnackbar();

  const membersIdList = userList.map((member) => {
    return member.id;
  });

  const getApplicantMemberList = async () => {
    if (studyId) {
      const getList = await getApplicantMembers({
        studyId,
      });
      setApplicantMemberList(getList);
    }
  };

  useEffect(() => {
    if (user?.id === userList[STUDY_OWNER].id) setIsOwner(true);
    else setIsOwner(false);
  }, [user]);

  useEffect(() => {
    const getPostList = async () => {
      if (studyId) {
        const getNoticeList = await getPosts({
          studyId: Number(studyId),
          category: "NOTICE",
        });
        setNoticePostList(getNoticeList.posts);

        const getGeneralList = await getPosts({
          studyId: Number(studyId),
          category: "GENERAL",
        });
        setGeneralPostList(getGeneralList.posts);
      }
    };

    getPostList();
    getApplicantMemberList();
  }, [studyId]);

  const isStudyMember = user && membersIdList.includes(user.id);

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    console.log("newValue", newValue);
    setTabNumber(newValue);
  };

  const handlePostClick = (id: number) => {
    router.push({
      pathname: `/post/${id}`,
      query: { tabNumber, studyId },
    });
  };

  const handleWriteButtonClick = () => {
    router.push({
      pathname: `/postCreate`,
      query: { tabNumber, studyId, isOwner },
    });
  };

  const handleStudyEditButtonClick = () => {
    router.push(`/studyEdit/${studyId}`);
  };

  const onAccepted = async (memberId: number) => {
    try {
      await putApplicantAcceptOrDeny({
        studyId,
        memberId,
        status: "ACCEPTED",
      });
      renderSnackbar("승인 성공");
    } catch (error) {
      renderSnackbar("승인 실패", "error");
    }
    getApplicantMemberList();
  };

  const onDenied = async (memberId: number) => {
    try {
      await putApplicantAcceptOrDeny({
        studyId,
        memberId,
        status: "DENIED",
      });
      renderSnackbar("거절 성공 ");
    } catch (error) {
      renderSnackbar("거절 실패", "error");
    }
    getApplicantMemberList();
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
        {noticePostList.length !== 0 ? (
          <S.StyledUl>
            {noticePostList?.map((post) => (
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
        {generalPostList.length !== 0 ? (
          <S.StyledUl>
            {generalPostList?.map((post) => (
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
  const studyID = Number(context.query.id);
  const studyData = await getStudyDetailInfo(studyID);
  return { props: { studyData } };
};
