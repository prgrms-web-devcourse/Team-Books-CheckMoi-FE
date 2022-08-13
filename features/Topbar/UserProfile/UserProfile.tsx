import { useState } from "react";
import type { MouseEvent } from "react";
import { Avatar, MenuItem, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import * as S from "./style";
import LogoutModal from "./LogoutModal";
import { useUserContext } from "../../../hooks/useUserContext";

export const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const router = useRouter();
  const { user } = useUserContext();

  const handleProfileOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = () => {
    router.push(`/userProfile/${user?.id}`);
  };

  const handleStudyClick = (studyId: number) => {
    router.push(`/study/${studyId}`);
  };

  const handleLogoutModalOpen = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutModalClose = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleProfileOpen}>
        프로필
      </Button>
      <S.StyledMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleProfileClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <S.AvatarWrapper onClick={handleAvatarClick}>
          <Avatar src={user?.image} />
          <S.StyledUserInfo>
            <span>{user?.name}</span>
            <S.SmallSpan>{user?.email}</S.SmallSpan>
            <S.SmallSpan>{user?.temperature}℃</S.SmallSpan>
          </S.StyledUserInfo>
        </S.AvatarWrapper>
        <S.StyledDivider />
        {user?.studies.length ? (
          user.studies.map(({ id, name }) => (
            <MenuItem onClick={() => handleStudyClick(id)} key={id}>
              <Typography noWrap>{name}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleProfileClose}>
            <Typography noWrap>아직 가입한 스터디가 없습니다</Typography>
          </MenuItem>
        )}
        <S.StyledDivider />
        <S.LogoutButtonWrapper>
          <Button
            variant="contained"
            size="small"
            onClick={handleLogoutModalOpen}
          >
            로그아웃
          </Button>
        </S.LogoutButtonWrapper>
      </S.StyledMenu>
      <LogoutModal
        open={isLogoutModalOpen}
        handleModalClose={handleLogoutModalClose}
      />
    </>
  );
};
