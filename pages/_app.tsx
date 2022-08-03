/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Topbar } from "../features/Topbar";
import * as S from "../styles/PageStyle";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Topbar />
      <S.ContentContainer>
        <Component {...pageProps} />
      </S.ContentContainer>
    </>
  );
};

export default MyApp;
