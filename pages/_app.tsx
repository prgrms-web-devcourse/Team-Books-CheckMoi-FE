/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Topbar } from "../features/Topbar";
import * as S from "../styles/LayoutStyle";
import UserContextProvider from "../contexts/UserContextProvider";
import { UserType } from "../types/userType";
import { getMyInfo } from "../apis/user";

interface MyAppProps extends AppProps {
  user: UserType | null;
}

const MyApp = ({ Component, pageProps, user }: MyAppProps) => {
  return (
    <UserContextProvider initialUser={user}>
      <Topbar />
      <S.ContentContainer>
        <Component {...pageProps} />
      </S.ContentContainer>
    </UserContextProvider>
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
