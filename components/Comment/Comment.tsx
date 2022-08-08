import { Avatar } from "@mui/material";
import { User } from "../../types/userType";
import * as S from "./style";

interface CommentProps {
  user: User;
  content: string;
}

export const Comment = ({ user, content }: CommentProps) => {
  return (
    <S.CommentContainer>
      <S.UserWrapper>
        <Avatar src={user.img} /> {user.name}
      </S.UserWrapper>
      <p>{content}</p>
    </S.CommentContainer>
  );
};
