import { useState } from "react";
import type { MouseEvent } from "react";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import * as S from "./style";

// TODO 사용자 정보 불러오기
const FAKE_USER_NAME = "고광필";
const FAKE_STUDY_LIST = [
  { id: 1, title: "이름이 매우매우 매우 매우 매우 매우 긴 스터디" },
  // { id: 1, title: "일이삼사오육칠팔구" },
  { id: 2, title: "스터디 2" },
  { id: 3, title: "스터디 3" },
];

export const Topbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
    setAnchorEl(null);
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.StyledAppbar position="fixed">
      <Toolbar>
        {/* TODO 로고가 정해지면 로고 바꾸기 */}
        <S.LogoIcon />
        <S.LogoText variant="h6" noWrap>
          책모이
        </S.LogoText>
        <S.SearchInputContainer className="SearchWrapper">
          <S.SearchInput className="Search">
            <S.SearchIconWrapper>
              <SearchIcon />
            </S.SearchIconWrapper>
            <S.StyledInputBase
              placeholder="책을 검색해주세요"
              inputProps={{ "aria-label": "search" }}
            />
          </S.SearchInput>
        </S.SearchInputContainer>
        {/* TODO 로그인, 로그아웃 처리 필요 */}
        {isLogin ? (
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
                {FAKE_USER_NAME}
              </S.AvatarWrapper>
              <S.StyledDivider />
              {FAKE_STUDY_LIST.map(({ id, title }) => (
                <MenuItem onClick={handleClose} key={id}>
                  <Typography noWrap>{title}</Typography>
                </MenuItem>
              ))}
              <S.LogoutButtonWrapper>
                <Button variant="contained" size="small" onClick={handleLogout}>
                  로그아웃
                </Button>
              </S.LogoutButtonWrapper>
            </S.StyledMenu>
          </>
        ) : (
          <Button variant="contained" onClick={handleLogin}>
            로그인
          </Button>
        )}
      </Toolbar>
    </S.StyledAppbar>
  );
};
