import { useState } from "react";
import type { MouseEvent } from "react";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as S from "./style";

export const Topbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
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
        <S.LogoIcon />
        <S.LogoText variant="h6" noWrap>
          책모이
        </S.LogoText>
        <S.SearchWrapper>
          <S.Search>
            <S.SearchIconWrapper>
              <SearchIcon />
            </S.SearchIconWrapper>
            <S.StyledInputBase
              placeholder="책을 검색해주세요"
              inputProps={{ "aria-label": "search" }}
            />
          </S.Search>
        </S.SearchWrapper>
        {isLogin ? (
          <>
            <Button variant="contained" onClick={handleOpen}>
              프로필
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
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
