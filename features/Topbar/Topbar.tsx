import { useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import Image from "next/image";
import * as S from "./style";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";
import { useUserContext } from "../../hooks/useUserContext";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";

const SEARCH_URL = "/search";
const SEARCH_URL_SIZE = 6;
const LOGO_SIZE = 40;

interface TopbarProps {
  message: string;
}

export const Topbar = ({ message }: TopbarProps) => {
  const router = useRouter();
  const { user } = useUserContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const inputDefaultValue = useRef("");
  const isClientWindow = typeof window !== "undefined";

  if (isClientWindow)
    if (window.location.pathname === SEARCH_URL) {
      const urlWord = window.location.search
        ?.split("&")[0]
        ?.slice(SEARCH_URL_SIZE)
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
      pathname: SEARCH_URL,
      query: {
        word,
        page: 1,
      },
    });
  };

  useEffect(() => {
    if (message) {
      renderSnackbar(message, "error");
      document.cookie = "expired=; path=/";
    }
  }, [message]);

  return (
    <S.StyledAppbar position="fixed">
      <Toolbar>
        <S.LogoContainer onClick={() => router.push("/")}>
          <Image src="/images/logo.png" width={LOGO_SIZE} height={LOGO_SIZE} />
          <S.LogoText variant="h6" noWrap>
            책모이
          </S.LogoText>
        </S.LogoContainer>
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
