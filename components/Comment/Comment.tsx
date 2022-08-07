import { Avatar } from "@mui/material";
import { User } from "../../types/userType";
import * as S from "./style";

interface CommentProps {
  user: User;
  content: string;
}

// TODO Props로 전달 받아야 하는 내용 -> 댓글 작성자 정보, 댓글 내용

export const Comment = ({ user, content }: CommentProps) => {
  return (
    <S.CommentContainer>
      <S.UserWrapper>
        <Avatar src={user.img} /> {user.userId}
      </S.UserWrapper>
      <p>{content}</p>
    </S.CommentContainer>
  );
};
