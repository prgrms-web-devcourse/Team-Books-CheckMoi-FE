import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import * as S from "./style";

export const Topbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "green" }}>
      <Toolbar>
        <AutoStoriesIcon />
        <S.LogoText variant="h6" noWrap>
          책모이
        </S.LogoText>
      </Toolbar>
    </AppBar>
  );
};
