/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { Topbar } from "../features/Topbar";
import * as S from "../styles/LayoutStyle";
import UserContextProvider from "../contexts/UserContextProvider";
import { User } from "../types/userType";
import { getMyInfo } from "../apis/user";

interface MyAppProps extends AppProps {
  user: User | null;
}

const MyApp = ({ Component, pageProps, user }: MyAppProps) => {
  const snackbarRef = useRef<SnackbarProvider>(null);

  return (
    <SnackbarProvider maxSnack={3} ref={snackbarRef}>
      <UserContextProvider initialUser={user}>
        <Topbar />
        <S.ContentContainer>
          <Component {...pageProps} />
        </S.ContentContainer>
      </UserContextProvider>
    </SnackbarProvider>
  );
};

type TokenType = string | undefined;

MyApp.getInitialProps = async (context: any) => {
  const token: TokenType = context?.ctx?.req?.cookies?.token;

  if (token)
    try {
      const user = await getMyInfo(token);

      return {
        user,
      };
    } catch (error) {
      return {
        user: null,
      };
    }

  return {
    user: null,
  };
};

export default MyApp;
