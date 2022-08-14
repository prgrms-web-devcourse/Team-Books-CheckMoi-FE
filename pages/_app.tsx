/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { Topbar } from "../features/Topbar";
import * as S from "../styles/LayoutStyle";
import UserContextProvider from "../contexts/UserContextProvider";
import type { TopbarUserType } from "../types/userType";
import { apiSSR, END_POINT } from "../apis";

interface MyAppProps extends AppProps {
  user: TopbarUserType | null;
  message: string;
}

const MyApp = ({ Component, pageProps, user, message }: MyAppProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <UserContextProvider initialUser={user}>
        <Topbar message={message} />
        <S.ContentContainer>
          <Component {...pageProps} />
        </S.ContentContainer>
      </UserContextProvider>
    </SnackbarProvider>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const flag = context.ctx.asPath?.split("error=")[1];
  const message = flag ? "로그인 시간이 만료됨" : "";
  const cookie = context.ctx.req?.headers.cookie;

  if (cookie) {
    const token = cookie.split("token=")[1];

    try {
      const user = await apiSSR.get<TopbarUserType, TopbarUserType>(
        `${END_POINT.getMyInfo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        user,
        message,
      };
    } catch (error) {
      return {
        user: null,
        message,
      };
    }
  }

  return {
    user: null,
    message,
  };
};

export default MyApp;
