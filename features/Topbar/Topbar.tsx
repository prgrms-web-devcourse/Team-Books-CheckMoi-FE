import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import Link from "next/link";
import * as S from "./style";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";

// TODO 사용자 정보 불러오기

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
      const urlWord = window.location.search
        .slice(FAKE_QUERY_SIZE)
        .replaceAll("+", " ")
        .trim();
      inputDefaultValue.current = decodeURIComponent(urlWord);
      if (inputRef.current)
        inputRef.current.value = decodeURIComponent(urlWord);
    } else if (inputRef.current) inputRef.current.value = "";

  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as Element;
    const word = target.querySelector("input")?.value.trim();

    if (!word) {
      // TODO alert 통일해서 추가하기
      alert("검색 값을 입력해주세요");
      return;
    }

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
          <UserProfile handleLogout={handleLogout} />
        ) : (
          <LoginButton />
        )}
      </Toolbar>
    </S.StyledAppbar>
  );
};
