import { useEffect, useState } from "react";
import {
  Divider,
  CircularProgress as CircularLoading,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import type { StudyType } from "../../types/studyType";
import { StudyContent } from "../../components/StudyContent";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo, joinStudy } from "../../apis";
import type { TopbarUserType, UserType } from "../../types/userType";
import type { BookType } from "../../types/bookType";
import { useUserContext } from "../../hooks/useUserContext";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import { LoginRequestModal } from "../LoginRequestModal";

interface StudyDetailProps {
  id: number;
  open: boolean;
  isPage?: boolean;
}

interface Test {
  study: StudyType;
  members: {
    id: number;
    user: UserType;
  }[];
  book: BookType;
}

export const StudyDetail = ({
  id,
  open = false,
  isPage = false,
}: StudyDetailProps) => {
  const { user } = useUserContext();
  const [isMember, setIsMember] = useState(false);
  const { renderSnackbar } = useOurSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [studyInfo, setStudyInfo] = useState({
    study: {},
  } as Test);

  const enterStudy = async (
    studyId: number,
    inputUser: TopbarUserType | null
  ) => {
    if (!inputUser) {
      setOpenModal(true);
      return;
    }

    try {
      await joinStudy(studyId);
      renderSnackbar("스터디 신청이 완료 되었습니다");
    } catch (error: any) {
      const { message } = error.response.data.errors[0];
      renderSnackbar(message, "error");
    }
  };

  useEffect(() => {
    const studyInfoFetch = async (studyId: number) => {
      const { study, members, book } = await getStudyDetailInfo(studyId);
      if (members.filter((member) => member.user.id === user?.id).length > 0)
        setIsMember(true);

      setStudyInfo({
        study,
        members,
        book,
      });
    };
    if (open) studyInfoFetch(id);
  }, [open]);

  const handleStudyJoinClick = async () => {
    if (!user) setOpenModal(true);
    else enterStudy(id, user);
  };

  const handleGoStudyClick = () => {
    router.push(`/study/${id}`);
  };

  const handleOnCloseClick = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {studyInfo.study.id ? (
        <>
          <StudyDetailCard
            study={studyInfo.study}
            members={studyInfo.members}
            book={studyInfo.book}
          />
          <Divider color="grey" />
          <StudyContent
            description={studyInfo.study.description}
            isMember={isMember}
            joinOnClick={handleStudyJoinClick}
            goStudyOnClick={handleGoStudyClick}
            height={isPage ? "40vh" : 10}
          />
          <LoginRequestModal.Container
            open={openModal}
            onClose={handleOnCloseClick}
          >
            <LoginRequestModal.Title>
              스터디 참여하기 위해서 로그인이 필요합니다
            </LoginRequestModal.Title>
            <LoginRequestModal.Content>
              로그인을 하시겠습니까?
            </LoginRequestModal.Content>
          </LoginRequestModal.Container>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <CircularLoading />
        </Box>
      )}
    </div>
  );
};
