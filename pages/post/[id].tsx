import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Divider, Tabs, Tab, Button } from "@mui/material";
import { CommentInput } from "../../components/CommentInput";
import { delPost, getPost } from "../../apis";
import * as S from "../../styles/PostStyle";

// TODO 타입 따로 빼기
interface PostType {
  id: number;
  title: string;
  content: string;
  category: string;
  studyId: number;
  writer: string;
  writerImage: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

const PostPage = () => {
  const router = useRouter();

  const { id, studyId, tabNumber } = router.query;
  const currentTab = tabNumber ? +tabNumber : 0;

  const [TabValue, setTabValue] = useState(currentTab);
  const [post, setPost] = useState({} as PostType);

  useEffect(() => {
    const getPostApi = async (postId: string) => {
      const postData = await getPost(postId);
      setPost(postData);
    };
    if (id) getPostApi(id as string);
  }, []);

  // TODO api 연결 후 지울 변수
  const DATE = "2022/08/05";
  const [year, month, day] = DATE.split("/");

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    router.push({
      pathname: `/study/${studyId}`,
      query: { tabNumber: newValue },
    });
    setTabValue(newValue);
  };

  const handleUpdateClick = async () => {
    router.push(`/postUpdate/${id}`);
  };

  const handleDeleteClick = async () => {
    alert("정말 삭제하시겠습니까?");
    router.push(`/study/${studyId}`);
    await delPost(Number(id));
  };

  // TODO 현재 로그인한 유저와 게시글을 작성한 유저를 비교해서 동일할 경우 삭제, 수정 버튼 보이기

  return (
    <div>
      {post.id && (
        <>
          <S.TabsContainer>
            <Tabs value={TabValue} onChange={handleTabChange}>
              <Tab label="공지" />
              <Tab label="자유" />
            </Tabs>
            <S.ButtonsContainer>
              <Button variant="contained" onClick={handleUpdateClick}>
                수정
              </Button>
              <Button variant="contained" onClick={handleDeleteClick}>
                삭제
              </Button>
            </S.ButtonsContainer>
          </S.TabsContainer>
          <S.BoardTitle>{post.title}</S.BoardTitle>
          <S.BoardInfo>
            <S.StyledAvatar src={post.writerImage} />
            <S.AvatarName>{post.writer}</S.AvatarName>
            <div>·</div>
            <S.BoardCreateDate>
              {year}년 {month}월 {day}일
            </S.BoardCreateDate>
          </S.BoardInfo>
          <Divider />
          <S.BoardContent>{post.content}</S.BoardContent>
          <Divider />
          <CommentInput />
        </>
      )}

      {/* TODO Comment List 출력 */}
    </div>
  );
};

export default PostPage;
