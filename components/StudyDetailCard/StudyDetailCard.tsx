import { MouseEvent, useState } from "react";
import { Avatar, Menu } from "@mui/material";
import { StudyState } from "./StudyState";
import * as S from "./style";
import type { User } from "../../types/userType";
import { selectStudyState } from "./helper";
import { BookCard } from "../BookCard";

interface StudyDetailProps {
  title: string;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  maxParticipant: number;
  currentParticipant: number;
  member: User[];
}

// TODO Image => future Image로 수정해야 함
export const StudyDetailCard = ({
  title = "스터디 제목",
  gatherStartDate = "2022/6/30",
  gatherEndDate = "2022/7/30",
  studyStartDate = "2022/7/2",
  studyEndDate = "2022/9/2",
  maxParticipant = 16,
  currentParticipant = 0,
  member = [],
}: StudyDetailProps) => {
  const studyState = selectStudyState(
    gatherEndDate,
    studyStartDate,
    studyEndDate
  );
  console.log(studyState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarListClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarListClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = (userId: string) => {
    // TODO 유저 상세 정보 페이지로 리다이렉션 필요
  };

  return (
    <S.StudyDetailCard>
      {/* <S.ImageWrapper>
        <div>북카드 컴포넌트 넣기</div>
      </S.ImageWrapper> */}
      <BookCard
        src="https://shopping-phinf.pstatic.net/main_3247271/32472713016.20220527034215.jpg"
        title=""
        size={10}
        onClick={() => {}}
      />
      <S.StudyInfoContainer>
        <S.StyledTypograph>{title}</S.StyledTypograph>
        {studyState === "recruiting" && (
          <S.ResponsiveText>
            모집 인원 : {currentParticipant}/{maxParticipant}
          </S.ResponsiveText>
        )}
        <S.ResponsiveText>
          모집 기간 : {`${gatherStartDate} - ${gatherEndDate}`}
        </S.ResponsiveText>
        <S.ResponsiveText>
          진행 기간 : {`${studyStartDate} - ${studyEndDate}`}
        </S.ResponsiveText>
      </S.StudyInfoContainer>

      <S.StyledAvatarGroup max={2} onClick={handleAvatarListClick}>
        {member.map((user) => (
          <Avatar key={user.userId} src={user.img} />
        ))}
      </S.StyledAvatarGroup>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleAvatarListClose}
      >
        {member.map((user) => {
          return (
            <S.StyledMenuItem
              key={user.userId}
              onClick={() => {
                handleUserClick(user.userId);
              }}
            >
              <Avatar src={user.img} />
              <span>{user.name}</span>
            </S.StyledMenuItem>
          );
        })}
      </Menu>
      {studyState !== "done" && <StudyState studyState={studyState} />}
    </S.StudyDetailCard>
  );
};
