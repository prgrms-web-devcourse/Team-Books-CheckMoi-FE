import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useRouter } from "next/router";
import { Divider, Tabs, Tab, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { CommentInput } from "../../components/CommentInput";
import { Comment } from "../../components/Comment";
import { postComments, getComments, getPost } from "../../apis";
import type { CommentsType } from "../../types/commentType";
import type { PostsType } from "../../types/postType";
import { getMyInfo } from "../../apis/user";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import { useUserContext } from "../../hooks/useUserContext";
import { DeleteModal } from "../../features/DeleteModal";
import { NoAccess } from "../../components/NoAccess";
import * as S from "../../styles/PostStyle";
import { useInView } from "../../hooks/useInView";

const PostPage = () => {
  const router = useRouter();
  const { id, studyId, tabNumber } = router.query;
  const currentTab = tabNumber ? +tabNumber : 0;
  const [commentList, setCommentList] = useState<CommentsType[]>([]);
  const [currentUserId, setCurrentUserId] = useState(-1);
  const { renderSnackbar } = useOurSnackbar();
  const { user } = useUserContext();

  const [post, setPost] = useState({} as PostsType);
  const [postDate, setPostDate] = useState([] as string[]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ref, inView] = useInView();
  const [pageState, setPageState] = useState({ pageNumber: 1, totalPage: 2 });
  const [loading, setLoading] = useState(false);

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
    const getPostApi = async (postId: number) => {
      const postData = await getPost(postId);
      setPost(postData);
      setPostDate(postData.createdAt.split("/"));
    };
    if (id) getPostApi(Number(id));
  }, []);

  const handleUpdateClick = async () => {
    router.push(`/postUpdate/${id}`);
  };

  const getAllCommentList = async (page = -1) => {
    const correctPage = page > 0 ? page : pageState.totalPage;
    const result = await getComments({
      postId: Number(id),
      page: correctPage,
    });

    setCommentList([
      ...commentList,
      result.comments[result.comments.length - 1],
    ]);
  };

  useEffect(() => {
    const getCommentList = async (page = 1) => {
      setLoading(true);
      const data = await getComments({ postId: Number(id), page });
      const { comments, totalPage } = data;
      setCommentList([...commentList, ...comments]);
      setPageState({ ...pageState, totalPage });
      setLoading(false);
    };
    getCommentList(pageState.pageNumber);
  }, [pageState.pageNumber]);

  useEffect(() => {
    if (inView && !loading)
      setPageState({ ...pageState, pageNumber: pageState.pageNumber + 1 });
  }, [inView]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await getMyInfo();
      setCurrentUserId(currentUser.id);
    };
    getCurrentUser();
  }, []);

  const onCreateComment = async (content: string) => {
    try {
      const newCommentId = await postComments({ postId: Number(id), content });
      if (newCommentId)
        if (
          pageState.pageNumber === pageState.totalPage ||
          pageState.totalPage === 0
        ) {
          const pageNum = Math.floor((commentList.length + 1) / 10);
          const remainder = (commentList.length + 1) % 10;
          if (pageNum >= pageState.totalPage && remainder >= 1)
            getAllCommentList(pageNum + 1);
          else if (pageNum > pageState.totalPage && remainder === 0)
            getAllCommentList(pageNum);
          else getAllCommentList();
        }

      renderSnackbar("댓글 추가 성공");
    } catch (error) {
      renderSnackbar("댓글 추가 실패", "error");
    }
  };

  const onDeleteComment = (commentId: number) => {
    const updateComment = commentList.filter(
      (comment) => comment.id !== commentId
    );
    setCommentList(updateComment);
  };

  const handleDeleteClick = async () => {
    setIsModalOpen(true);
  };

  const handleNoticeTabClick = () => {
    router.push({
      pathname: `/study/${studyId}`,
      query: { tabNumber: 0 },
    });
  };

  const handleGeneralTabClick = () => {
    router.push({
      pathname: `/study/${studyId}`,
      query: { tabNumber: 1 },
    });
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
              <Tabs value={currentTab}>
                <Tab label="공지" onClick={handleNoticeTabClick} />
                <Tab label="자유" onClick={handleGeneralTabClick} />
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
            <CommentInput onCreateComment={onCreateComment} />
            <DeleteModal
              id={post.id}
              studyId={post.studyId}
              open={isModalOpen}
              onClose={handleCloseModal}
            />
            {commentList.map((comment) => (
              <Comment
                key={comment.id}
                commentProps={comment}
                currentUserId={currentUserId}
                onDeleteComment={onDeleteComment}
              />
            ))}
          </>
        )
      )}
      {pageState.pageNumber < pageState.totalPage ? <div ref={ref} /> : null}
    </div>
  );
};

export default PostPage;
