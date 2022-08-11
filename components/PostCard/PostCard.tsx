import { Avatar, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import type { PostType } from "../../types/postType";
import * as S from "./style";

interface PostCardProps {
  post: PostType;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [year, month, day] = post.createdAt.split("/");
  return (
    <S.PostCard size={post.size} onClick={post.onClick}>
      <S.PostTitle>{post.title}</S.PostTitle>
      <S.PostContent>{post.content}</S.PostContent>
      <S.PostCreatedAt>{`${year}년 ${month}월 ${day}일`}</S.PostCreatedAt>
      <Divider light />
      <S.PostBottomContainer>
        <S.PostUserWarpper>
          <Avatar src={post.user.image} />
          {post.user.id}
        </S.PostUserWarpper>
        <S.StyledBadge badgeContent={post.comments} color="primary">
          <ChatIcon color="action" />
        </S.StyledBadge>
      </S.PostBottomContainer>
    </S.PostCard>
  );
};
