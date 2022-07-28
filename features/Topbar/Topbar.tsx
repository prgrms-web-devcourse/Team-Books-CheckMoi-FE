import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import * as S from "./style";

export const Topbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "green" }}>
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
        <Button variant="contained">로그인</Button>
      </Toolbar>
    </AppBar>
  );
};
