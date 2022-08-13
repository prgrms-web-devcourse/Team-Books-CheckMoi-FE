import { useState, ChangeEvent } from "react";
import { MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import * as S from "./style";
import { createPost, putPost } from "../../apis";
import { useUserContext } from "../../hooks/useUserContext";
import { NoAccess } from "../../components/NoAccess";

interface PostFormProp {
  state: string;
  selectValue: string;
  postId?: number;
  title: string;
  content: string;
  studyId: number;
  isOwner?: boolean;
}

export const PostForm = ({
  state,
  selectValue,
  postId,
  title,
  content,
  studyId,
  isOwner,
}: PostFormProp) => {
  const [postSelectValue, setPostSelectValue] = useState(selectValue);
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setPostContent] = useState(content);

  const router = useRouter();
  const { user } = useUserContext();

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setPostSelectValue(event.target.value as string);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostContent(event.target.value);
  };

  const handleOnClick = async () => {
    const postObject = {
      title: postTitle,
      content: postContent,
      category: postSelectValue,
      studyId,
    };
    if (state === "POST") {
      const getPostId = await createPost(postObject);
      if (getPostId)
        router.push({
          pathname: `/post/${getPostId}`,
          query: { tabNumber: postSelectValue === "NOTICE" ? 0 : 1, studyId },
        });
    } else if (state === "PUT") {
      await putPost(postId as number, postObject);
      router.push({
        pathname: `/post/${postId}`,
        query: { tabNumber: postSelectValue === "NOTICE" ? 0 : 1, studyId },
      });
    }
  };

  return (
    <div>
      {user ? (
        <S.Container>
          <S.Title>
            <S.StyledSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={postSelectValue}
              onChange={handleSelectChange}
              disabled={!isOwner}
            >
              <MenuItem value="NOTICE">공지</MenuItem>
              <MenuItem value="GENERAL">자유</MenuItem>
            </S.StyledSelect>
            <S.StyledTextField
              name="title"
              variant="standard"
              value={postTitle}
              placeholder="제목을 입력해주세요"
              margin="dense"
              fullWidth
              onChange={handleTitleChange}
            />
          </S.Title>
          <TextField
            name="content"
            variant="outlined"
            value={postContent}
            placeholder="내용을 입력해주세요"
            multiline
            minRows={15}
            margin="dense"
            onChange={handleContentChange}
          />
          <S.StyledButton variant="contained" onClick={handleOnClick}>
            {state === "POST" ? "게시하기" : "수정하기"}
          </S.StyledButton>
        </S.Container>
      ) : (
        <NoAccess
          title="이 페이지는 로그인한 사용자만 이용할 수 있습니다."
          description="책모이에 로그인하시면 다양한 서비스를 이용하실 수 있습니다."
        />
      )}
    </div>
  );
};
