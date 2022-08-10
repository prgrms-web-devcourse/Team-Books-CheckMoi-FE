import { Typography } from "@mui/material";
import * as S from "./style";

interface NoAccessProps {
  title: string;
  description: string;
}

export const NoAccess = ({ title, description }: NoAccessProps) => {
  return (
    <S.styledDiv>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6">{description}</Typography>
    </S.styledDiv>
  );
};
