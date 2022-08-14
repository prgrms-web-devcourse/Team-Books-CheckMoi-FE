import { MouseEvent, useState } from "react";
import { Avatar, Menu } from "@mui/material";
import { useRouter } from "next/router";
import { StudyState } from "./StudyState";
import * as S from "./style";
import type { UserType } from "../../types/userType";
import type { StudyStatusType, StudyType } from "../../types/studyType";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import type { BookType } from "../../types/bookType";

interface StudyDetailProps {
  study: StudyType;
  members: {
    id: number;
    user: UserType;
  }[];
  book?: BookType;
}

export const StudyDetailCard = ({
  study,
  members = [],
  book,
}: StudyDetailProps) => {
  const router = useRouter();
  const {
    id,
    name,
    thumbnail,
    currentParticipant,
    maxParticipant,
    gatherStartDate,
    gatherEndDate,
    studyStartDate,
    studyEndDate,
    status,
  } = study;

  const { renderSnackbar } = useOurSnackbar();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarListClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarListClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = (userId: number) => {
    router.push(`/userProfile/${userId}`);
  };

  const handleShareClick = async () => {
    const { origin } = window.location;
    const willCopyUrl = `${origin}/studyRecruiting/${id}`;
    await navigator.clipboard.writeText(willCopyUrl);
    renderSnackbar("스터디 링크가 복사 되었습니다");
  };

  const handleBookTitleClick = () => {
    const word = book?.isbn.trim();

    router.push({
      pathname: "/search",
      query: {
        word,
        page: 1,
      },
    });
  };

  return (
    <S.StudyDetailCard>
      <S.ImageWrapper>
        <S.StudyThumbnail size={10} src={thumbnail} title="" />
      </S.ImageWrapper>
      <S.StudyInfoContainer>
        <S.StyledTypograph>{name}</S.StyledTypograph>
        <S.BookTitleText onClick={handleBookTitleClick}>
          책 제목 : {book?.title}
        </S.BookTitleText>
        {status === "recruiting" && (
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
      <S.IconsContainer>
        <S.StyledShareIcon onClick={handleShareClick} />
        <S.StyledAvatarGroup max={2} onClick={handleAvatarListClick}>
          {members.map((member) => (
            <Avatar key={`AvatarGroup_${member.id}`} src={member.user.image} />
          ))}
        </S.StyledAvatarGroup>
      </S.IconsContainer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleAvatarListClose}
      >
        {members.map((member) => {
          return (
            <S.StyledMenuItem
              key={`avatar-${member.id}`}
              onClick={() => handleUserClick(member.user.id)}
            >
              <Avatar src={member.user.image} />
              <span>{member.user.name}</span>
            </S.StyledMenuItem>
          );
        })}
      </Menu>
      <StudyState studyState={status as StudyStatusType} />
    </S.StudyDetailCard>
  );
};
