import { MouseEvent, useState } from "react";
import { AvatarGroup, Avatar, Menu } from "@mui/material";
import { StudyState } from "./StudyState";
import * as S from "./style";
import type { User } from "../../types/userType";

interface StudyDetailProps {
  size: number;
  src: string;
  title: string;
  gatherStartDate: Date;
  gatherEndDate: Date;
  studyStartDate: Date;
  studyEndDate: Date;
  maxParticipant: number;
  currentParticipant: number;
  member: User[];
}

// TODO Image => future Image로 수정해야 함
export const StudyDetailCard = ({
  size = 128,
  src = "https://picsum.photos/200",
  title = "스터디 제목",
  gatherStartDate = new Date(2022, 7, 1),
  gatherEndDate = new Date(2022, 7, 31),
  studyStartDate = new Date(2022, 8, 1),
  studyEndDate = new Date(2022, 8, 30),
  maxParticipant = 16,
  currentParticipant = 0,
  member = [],
}: StudyDetailProps) => {
  const getYYYYMMDD = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();

    return `${yyyy}/${mm}/${dd}`;
  };

  const [isGathering, setIsGathering] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userOnClick = (userId: string) => {
    // TODO 유저 상세 정보 페이지로 리다이렉션 필요
  };

  return (
    <S.StudyDetailCard>
      <S.ImageWrapper>
        <div>북카드 컴포넌트 넣기</div>
      </S.ImageWrapper>
      <S.StudyInfoContainer>
        <S.ResponsiveText fontSize={1.3}>{title}</S.ResponsiveText>
        {isGathering && (
          <S.ResponsiveText>
            모집 인원 : {currentParticipant}/{maxParticipant}
          </S.ResponsiveText>
        )}
        <S.ResponsiveText>
          모집 기간 : {getYYYYMMDD(gatherStartDate)} -{" "}
          {getYYYYMMDD(gatherEndDate)}
        </S.ResponsiveText>
        <S.ResponsiveText>
          진행 기간 : {getYYYYMMDD(studyStartDate)} -{" "}
          {getYYYYMMDD(studyEndDate)}
        </S.ResponsiveText>
      </S.StudyInfoContainer>

      <AvatarGroup max={2} onClick={handleClick} style={{ height: "100%" }}>
        {member.map((user) => (
          <Avatar key={user.userId} src={user.img} />
        ))}
      </AvatarGroup>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        {member.map((user) => {
          return (
            <S.StyledMenuItem
              onClick={() => {
                userOnClick(user.userId);
              }}
            >
              <Avatar key={user.userId} src={user.img} />
              <span>{user.name}</span>
            </S.StyledMenuItem>
          );
        })}
      </Menu>
      <StudyState studyState="recruiting" />
    </S.StudyDetailCard>
  );
};
