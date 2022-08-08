import { useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import Link from "next/link";
import * as S from "./style";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";
import { useUserContext } from "../../hooks/useUserContext";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";

// TODO 사용자 정보 불러오기

const FAKE_URL = "/search";
const FAKE_QUERY_SIZE = 6;

export const Topbar = () => {
  const router = useRouter();
  const { user } = useUserContext();

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

  const { renderSnackbar } = useOurSnackbar();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as Element;
    const word = target.querySelector("input")?.value.trim();

    if (!word) {
      renderSnackbar("찾으려는 책을 입력해주세요", "warning");
      return;
    }

    router.push({
      pathname: FAKE_URL,
      query: { word },
    });
  };

  useEffect(() => {
    if (user) renderSnackbar("로그인에 성공했습니다");
  }, [user]);

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
        <S.SearchInputContainer>
          <form onSubmit={handleSubmit}>
            <S.SearchInput>
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
        {user ? <UserProfile /> : <LoginButton />}
      </Toolbar>
    </S.StyledAppbar>
  );
};
