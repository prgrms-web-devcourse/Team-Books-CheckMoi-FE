import { Avatar } from "@mui/material";
import type { UserType } from "../../types/userType";
import * as S from "./style";

interface CommentProps {
  user: UserType;
  content: string;
}

export const Comment = ({ user, content }: CommentProps) => {
  return (
    <S.CommentContainer>
      <S.UserWrapper>
        <Avatar src={user.image} /> {user.name}
      </S.UserWrapper>
      <p>{content}</p>
    </S.CommentContainer>
  );
};
