import React from "react";
import * as S from "./style";

interface SpacerProps {
  children?: React.ReactNode;
}

export const Spacer = ({ children }: SpacerProps) => {
  return <S.Conatiner>{children}</S.Conatiner>;
};
