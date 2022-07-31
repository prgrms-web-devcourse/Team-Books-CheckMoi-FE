import { useState } from "react";
import type { MouseEvent } from "react";
import { Avatar, MenuItem, Typography, Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import * as S from "./style";

interface UserProfileProps {
  handleLogout: () => void;
}

// TODO Context API 추가 후에 로그아웃은 내려받지 않도록 수정하기
export const UserProfile = ({ handleLogout }: UserProfileProps) => {
  const FAKE_USER_NAME = "고광필";
  const FAKE_USER_EMAIL = "abcdefghi@naver.com";
  const FAKE_STUDY_LIST = [
    { id: 1, title: "이름이 매우매우 매우 매우 매우 매우 긴 스터디" },
    { id: 2, title: "스터디 2" },
    { id: 3, title: "스터디 3" },
  ];
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickLogoutButton = () => {
    handleLogout();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        프로필
      </Button>
      <S.StyledMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <S.AvatarWrapper>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <S.StyledUserInfo>
            <span>{FAKE_USER_NAME}</span>
            <span>{FAKE_USER_EMAIL}</span>
          </S.StyledUserInfo>
        </S.AvatarWrapper>
        <S.StyledDivider />
        {FAKE_STUDY_LIST.map(({ id, title }) => (
          <MenuItem onClick={handleClose} key={id}>
            <Typography noWrap>{title}</Typography>
          </MenuItem>
        ))}
        <S.StyledDivider />
        <S.LogoutButtonWrapper>
          <Button variant="contained" size="small" onClick={clickLogoutButton}>
            로그아웃
          </Button>
        </S.LogoutButtonWrapper>
      </S.StyledMenu>
    </>
  );
};
