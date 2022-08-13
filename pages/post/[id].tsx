import { useEffect, useState } from "react";
import type { SyntheticEvent, MouseEvent } from "react";
import { useRouter } from "next/router";
import { Divider, Tabs, Tab, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { CommentInput } from "../../components/CommentInput";
import { Comment } from "../../components/Comment";
import { postComments, getComments } from "../../apis";
import type { CommentsType } from "../../types/commentType";
import { getMyInfo } from "../../apis/user";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import { getPost } from "../../apis";
import { useUserContext } from "../../hooks/useUserContext";
import { DeleteModal } from "../../features/DeleteModal";
import { NoAccess } from "../../components/NoAccess";
import * as S from "../../styles/PostStyle";


const PostPage = () => {
  const router = useRouter();

  const { id, studyId, tabNumber } = router.query;
  const currentTab = tabNumber ? +tabNumber : 0;
  const [value, setValue] = useState(currentTab);
  const [commentList, setCommentList] = useState<CommentsType[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const { renderSnackbar } = useOurSnackbar();
  const { user } = useUserContext();
  // TODO 포스트 상세 정보 가져오기


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
  const getCommentList = async () => {
    const result = await getComments({ postId: id as string });
    setCommentList(result.comments);
  };

  useEffect(() => {
    getCommentList();
  }, [id]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = document.cookie.split("=")[1];
      const user = await getMyInfo(token);
      setCurrentUserId(user.id);
    };
    getCurrentUser();
  }, []);

  const onCreateComment = async (content: string) => {
    try {
      await postComments({ postId: id as string, content });
      renderSnackbar("댓글 추가 성공");
    } catch (error) {
      renderSnackbar("댓글 추가 실패", "error");
    }
    getCommentList();
  };

  const onReloadComment = async () => {
    await getCommentList();
  };

  const handleDeleteClick = async () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {!user ? (
        <NoAccess
          title="이 페이지는 로그인한 사용자만 이용할 수 있습니다."
          description="책모이에 로그인하시면 다양한 서비스를 이용하실 수 있습니다."
        />
      ) : (
        post.id && (
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
        )
      )}
      {/* TODO Comment List 출력 */}
      {commentList.map((comment) => (
        <Comment
          key={comment.id}
          commentProps={comment}
          currentUserId={currentUserId}
          onReloadComment={onReloadComment}
        />
      ))}
    </div>
  );
};

export default PostPage;
