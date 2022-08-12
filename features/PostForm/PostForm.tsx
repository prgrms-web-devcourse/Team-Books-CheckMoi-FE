import { useState, ChangeEvent } from "react";
import { MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import * as S from "./style";
import { createPost, putPost } from "../../apis";

interface PostFormProp {
  state: string;
  selectValue: string;
  postId?: number;
  title: string;
  content: string;
  studyId: number;
}

export const PostForm = ({
  state,
  selectValue,
  postId,
  title,
  content,
  studyId,
}: PostFormProp) => {
  const [postSelectValue, setPostSelectValue] = useState(selectValue);
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setPostContent] = useState(content);

  const router = useRouter();
  // TODO 스터디 장이 쓰고있는지 받아서 이 작동 못하게 해야함
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
    <S.Container>
      <S.Title>
        <S.StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={postSelectValue}
          onChange={handleSelectChange}
        >
          <MenuItem value="NOTICE">공지</MenuItem>
          <MenuItem value="GENERIC">자유</MenuItem>
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
      {state === "POST" ? (
        <S.StyledButton variant="contained" onClick={handleOnClick}>
          게시하기
        </S.StyledButton>
      ) : (
        <S.StyledButton variant="contained" onClick={handleOnClick}>
          수정하기
        </S.StyledButton>
      )}
    </S.Container>
  );
};
