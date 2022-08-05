import { Avatar, Badge, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { ContactMail } from "@mui/icons-material";
import * as S from "./style";
import { User } from "../../types/userType";

interface PostProps {
  title: string;
  content: string;
  createdAt: string;
  comments: number;
  size: number;
  user: User;
}

// TODO Dummy Data를 사용해서 만든다.
// TODO POST 컴포넌트의 사이즈를 외부로 부터 받는다.
// TODO 타이틀 Border 처리
// TODO 컨텐츠 Ellipse 처리

// TODO 클릭시 해당 게시물 페이지로 이동.

export const PostCard = ({
  title,
  content,
  createdAt,
  comments,
  size,
  user,
}: PostProps) => {
  const [year, month, day] = createdAt.split("/");
  return (
    <S.PostCard size={size}>
      <S.PostTitle>{title}</S.PostTitle>
      <S.PostContent>{content}</S.PostContent>
      <S.PostCreatedAt>{`${year}년 ${month}월 ${day}일`}</S.PostCreatedAt>
      <Divider light />
      <S.PostBottomContainer>
        <S.PostUserWarpper>
          <Avatar src={user.img} />
          {user.userId}
        </S.PostUserWarpper>
        <Badge badgeContent={comments} color="primary">
          <ChatIcon color="action" />
        </Badge>
      </S.PostBottomContainer>
    </S.PostCard>
  );
};
