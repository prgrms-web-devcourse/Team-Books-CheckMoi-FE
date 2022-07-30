import { useRef, useState } from "react";
import type { MouseEvent, FormEvent } from "react";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Link from "next/link";
import * as S from "./style";

// TODO 사용자 정보 불러오기
const FAKE_USER_NAME = "고광필";
const FAKE_STUDY_LIST = [
  { id: 1, title: "이름이 매우매우 매우 매우 매우 매우 긴 스터디" },
  // { id: 1, title: "일이삼사오육칠팔구" },
  { id: 2, title: "스터디 2" },
  { id: 3, title: "스터디 3" },
];
const FAKE_URL = "/layoutTest";
const FAKE_QUERY_SIZE = 6;

export const Topbar = () => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const inputDefaultValue = useRef("");

  const isClientWindow = typeof window !== "undefined";
  if (isClientWindow)
    if (window.location.pathname === FAKE_URL) {
      // TODO FAKE_URL 수정 시 FAKE_QUERY_SIZE 수정
      const defaultInitValue = decodeURI(window.location.search).slice(
        FAKE_QUERY_SIZE
      );
      inputDefaultValue.current = defaultInitValue;
    } else if (inputRef.current) inputRef.current.value = "";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as Element;
    const word = target.querySelector("input")?.value;

    router.push({
      pathname: `/layoutTest`,
      query: { word },
    });
  };

  return (
    <S.StyledAppbar position="fixed">
      <Toolbar>
        {/* TODO 로고가 정해지면 로고 바꾸기 */}
        <S.LogoIcon />
        <S.LogoText variant="h6" noWrap>
          <Link href="/">
            <a href="{() => false}">책모이</a>
          </Link>
        </S.LogoText>
        <S.SearchInputContainer className="SearchWrapper">
          <form onSubmit={handleSubmit}>
            <S.SearchInput className="Search">
              <S.SearchIconWrapper>
                <SearchIcon />
              </S.SearchIconWrapper>
              <S.StyledInputBase
                placeholder="책을 검색해주세요"
                inputProps={{ "aria-label": "search" }}
                defaultValue={inputDefaultValue.current}
                inputRef={inputRef}
              />
            </S.SearchInput>
          </form>
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
