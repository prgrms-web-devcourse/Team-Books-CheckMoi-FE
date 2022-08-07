import type { MouseEventHandler } from "react";
import { Avatar, Badge, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import type { PostType } from "../../types/postType";
import * as S from "./style";
import { User } from "../../types/userType";

export const PostCard = ({
  title,
  content,
  createdAt,
  comments,
  size,
  user,
  onClick,
}: PostType) => {
  const [year, month, day] = createdAt.split("/");
  return (
    <S.PostCard size={size} onClick={onClick}>
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
