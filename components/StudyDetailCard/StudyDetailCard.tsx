import { MouseEvent, useState } from "react";
import { Avatar, Menu } from "@mui/material";
import { StudyState } from "./StudyState";
import * as S from "./style";
import type { User } from "../../types/userType";
import { selectStudyState } from "./helper";
import type { StudyType } from "../../types/studyType";
import { BookCard } from "../BookCard";

interface StudyDetailProps {
  study: StudyType;
  members: User[];
}

// TODO Image => future Image로 수정해야 함
export const StudyDetailCard = ({ study, members = [] }: StudyDetailProps) => {
  const {
    id,
    name,
    thumbnailUrl,
    currentParticipant,
    maxParticipant,
    gatherStartDate,
    gatherEndDate,
    studyStartDate,
    studyEndDate,
  } = study;

  const studyState = selectStudyState(
    gatherEndDate,
    studyStartDate,
    studyEndDate
  );

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
      <S.ImageWrapper>
        <BookCard size={10} src={thumbnailUrl} title="" />
      </S.ImageWrapper>
      <S.StudyInfoContainer>
        <S.StyledTypograph>{name}</S.StyledTypograph>
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
        {members.map((user) => (
          <Avatar key={`AvatarGroup_${user.userId}`} src={user.img} />
        ))}
      </S.StyledAvatarGroup>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleAvatarListClose}
      >
        {members.map((user) => {
          return (
            <S.StyledMenuItem
              key={`avatar-${user.userId}`}
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
