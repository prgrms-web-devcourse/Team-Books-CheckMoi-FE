import { SyntheticEvent, useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import { Divider, Tabs, Tab, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { CommentInput } from "../../components/CommentInput";
import { getPost } from "../../apis";
import * as S from "../../styles/PostStyle";
import { useUserContext } from "../../hooks/useUserContext";
import { DeleteModal } from "../../features/DeleteModal";

// TODO 타입 따로 빼기
interface PostType {
  id: number;
  title: string;
  content: string;
  category: string;
  studyId: number;
  writerId: number;
  writer: string;
  writerImage: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

const PostPage = () => {
  const router = useRouter();

  const { user } = useUserContext();

  const { id, studyId, tabNumber } = router.query;
  const currentTab = tabNumber ? +tabNumber : 0;

  const [TabValue, setTabValue] = useState(currentTab);

  const [post, setPost] = useState({} as PostType);
  const [postDate, setPostDate] = useState([] as string[]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getPostApi = async (postId: string) => {
      const postData = await getPost(postId);
      setPost(postData);
      setPostDate(postData.createdAt.split("/"));
    };
    if (id) getPostApi(id as string);
  }, []);

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
    setIsModalOpen(true);
  };

  return (
    <div>
      {post.id && (
        <>
          <S.TabsContainer>
            <Tabs value={TabValue} onChange={handleTabChange}>
              <Tab label="공지" />
              <Tab label="자유" />
            </Tabs>
          </S.TabsContainer>
          <S.BoardTitleContainer>
            <S.BoardTitle>{post.title}</S.BoardTitle>
            <S.ButtonsContainer>
              {Number(user?.id) === post.writerId && (
                <>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    sx={{ textAlign: "center" }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      sx={{ width: "5rem", justifyContent: "center" }}
                      onClick={handleUpdateClick}
                    >
                      수정
                    </MenuItem>
                    <MenuItem
                      sx={{ width: "5rem", justifyContent: "center" }}
                      onClick={handleDeleteClick}
                    >
                      삭제
                    </MenuItem>
                  </Menu>
                </>
              )}
            </S.ButtonsContainer>
          </S.BoardTitleContainer>
          <S.BoardInfo>
            <S.StyledAvatar src={post.writerImage} />
            <S.AvatarName>{post.writer}</S.AvatarName>
            <div>·</div>
            <S.BoardCreateDate>
              {postDate[0]}년 {postDate[1]}월 {postDate[2]}일
            </S.BoardCreateDate>
          </S.BoardInfo>
          <Divider />
          <S.BoardContent>{post.content}</S.BoardContent>
          <Divider />
          <CommentInput />
          <DeleteModal
            id={post.id}
            studyId={post.studyId}
            open={isModalOpen}
            onClose={handleCloseModal}
          />
        </>
      )}
      {/* TODO Comment List 출력 */}
    </div>
  );
};

export default PostPage;
