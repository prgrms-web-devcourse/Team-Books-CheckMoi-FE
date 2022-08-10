/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { Topbar } from "../features/Topbar";
import * as S from "../styles/LayoutStyle";
import UserContextProvider from "../contexts/UserContextProvider";
import type { TopbarUserType } from "../types/userType";
import { getMyInfo } from "../apis/user";

interface MyAppProps extends AppProps {
  user: TopbarUserType | null;
}

const MyApp = ({ Component, pageProps, user }: MyAppProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
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
