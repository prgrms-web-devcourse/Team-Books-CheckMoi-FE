import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import type { MouseEvent, KeyboardEvent, ChangeEvent } from "react";
import * as S from "./style";
import { deleteComment } from "../../apis";
import { putComment } from "../../apis/comments";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import { useUserContext } from "../../hooks/useUserContext";

interface CommentProps {
  commentProps: {
    id: number;
    userId: number;
    postId: number;
    createdAt: string;
    updatedAt: string;
    userImage: string;
    userName: string;
    content: string;
  };
  currentUserId: number;
  onDeleteComment: (commentId: number) => void;
}

export const Comment = ({
  commentProps,
  currentUserId,
  onDeleteComment,
}: CommentProps) => {
  const [anchorEl, setAncorEl] = useState<null | HTMLElement>(null);
  const [currentValue, setCurrentValue] = useState<string>(
    commentProps.content
  );
  const [editValue, setEditValue] = useState<string>(commentProps.content);
  const [isEditMode, setIsEditMode] = useState(false);
  const open = !!anchorEl;
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAncorEl(e.currentTarget);
  };

  const [year, month, day] = commentProps.updatedAt.split("/");
  const handleClose = () => {
    setAncorEl(null);
  };
  const { renderSnackbar } = useOurSnackbar();
  const { user } = useUserContext();

  const handleDeleteButtonClick = async () => {
    try {
      await deleteComment({
        commentId: commentProps.id,
      });
      renderSnackbar("댓글 삭제 성공");
      onDeleteComment(commentProps.id);
    } catch (error) {
      renderSnackbar("댓글 삭제 실패", "error");
    }
    handleClose();
  };

  const updateComment = async () => {
    try {
      await putComment({
        commentId: commentProps.id,
        content: editValue,
      });
      renderSnackbar("댓글 수정 성공");
    } catch (error) {
      renderSnackbar("댓글 수정 실패", "error");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      updateComment();
      setEditValue(editValue);
      setCurrentValue(editValue);
      setIsEditMode(false);
    }
  };

  const handleEditButtonClick = () => {
    setIsEditMode(true);
    handleClose();
  };

  return (
    <S.CommentContainer isOwner={commentProps.userId === user?.id}>
      <S.UserWrapper>
        <Avatar src={commentProps.userImage} />
      </S.UserWrapper>
      <S.ContentWrapper>
        <S.UserInfo>
          <Typography>{commentProps.userName}</Typography>
          <span>
            {year}년 {month}월 {day}일
          </span>
        </S.UserInfo>
        {!isEditMode ? (
          <Typography style={{ whiteSpace: "pre-line" }}>
            {currentValue}
          </Typography>
        ) : (
          <TextField
            className="textField"
            multiline
            maxRows={4}
            value={editValue}
            onChange={handleInputChange}
            placeholder="수정 사항을 입력하세요"
            onKeyDown={handleOnKeyDown}
          />
        )}
      </S.ContentWrapper>
      {commentProps.userId.toString() === currentUserId.toString() && (
        <>
          <S.StyledMenu>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </S.StyledMenu>

          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleEditButtonClick}>수정</MenuItem>
            <MenuItem onClick={handleDeleteButtonClick}>삭제</MenuItem>
          </Menu>
        </>
      )}
    </S.CommentContainer>
  );
};
