import * as S from "./style";

interface TestProps {
  string: string;
}

export const Test = ({ string }: TestProps) => {
  return <S.StyledTest string={string} />;
};
