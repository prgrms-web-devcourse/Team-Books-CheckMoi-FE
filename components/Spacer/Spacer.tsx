import React from "react";
import * as S from "./style";

interface SpacerProps {
  children?: React.ReactNode;
  size: number;
}

export const Spacer = ({ children, size }: SpacerProps) => {
  return <S.Conatiner size={size}>{children}</S.Conatiner>;
};
