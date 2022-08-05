/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Topbar } from "../features/Topbar";
import * as S from "../styles/LayoutStyle";
import UserContextProvider from "../contexts/UserContextProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserContextProvider>
      <Topbar />
      <S.ContentContainer>
        <Component {...pageProps} />
      </S.ContentContainer>
    </UserContextProvider>
  );
};

export default MyApp;
