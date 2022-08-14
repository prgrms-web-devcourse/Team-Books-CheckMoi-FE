import { Avatar, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import type { PostPropsType } from "../../types/postType";
import * as S from "./style";

interface PostCardProps {
  post: PostPropsType;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [year, month, day] = post.createdAt.split("/");
  return (
    <S.PostCard onClick={post.onClick}>
      <S.PostTitle>{post.title}</S.PostTitle>
      <S.PostContent>{post.content}</S.PostContent>
      <S.PostCreatedAt>{`${year}년 ${month}월 ${day}일`}</S.PostCreatedAt>
      <Divider light />
      <S.PostBottomContainer>
        <S.PostUserWarpper>
          <Avatar src={post.writerImage} />
          {post.writer}
        </S.PostUserWarpper>
        <S.StyledBadge badgeContent={post.commentCount} color="primary">
          <ChatIcon color="action" />
        </S.StyledBadge>
      </S.PostBottomContainer>
    </S.PostCard>
  );
};
