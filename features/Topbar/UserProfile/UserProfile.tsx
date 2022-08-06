import { useState } from "react";
import type { MouseEvent } from "react";
import { Avatar, MenuItem, Typography, Button } from "@mui/material";
import { Folder } from "@mui/icons-material";
import * as S from "./style";
import LogoutModal from "./LogoutModal";

// TODO Context API 추가 후에 로그아웃은 내려받지 않도록 수정하기
export const UserProfile = () => {
  const FAKE_USER_NAME = "고광필";
  const FAKE_USER_EMAIL = "abcdefghi@naver.com";
  const FAKE_STUDY_LIST = [
    { id: 1, title: "이름이 매우매우 매우 매우 매우 매우 긴 스터디" },
    { id: 2, title: "스터디 2" },
    { id: 3, title: "스터디 3" },
  ];
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleProfileOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
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
        <S.AvatarWrapper>
          <Avatar>
            <Folder />
          </Avatar>
          <S.StyledUserInfo>
            <span>{FAKE_USER_NAME}</span>
            <span>{FAKE_USER_EMAIL}</span>
          </S.StyledUserInfo>
        </S.AvatarWrapper>
        <S.StyledDivider />
        {FAKE_STUDY_LIST.map(({ id, title }) => (
          <MenuItem onClick={handleProfileClose} key={id}>
            <Typography noWrap>{title}</Typography>
          </MenuItem>
        ))}
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
