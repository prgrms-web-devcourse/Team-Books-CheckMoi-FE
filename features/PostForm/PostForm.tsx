import { useState, ChangeEvent } from "react";
import { MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import * as S from "./style";

interface PostFormProp {
  selectValue: string;
  title: string;
  content: string;
}

export const PostForm = ({ selectValue, title, content }: PostFormProp) => {
  // TODO Prop으로 NOTICE인지 FREE인지 전달해줘야할 듯
  // TODO title과 content 어떻게 서버로 보내지
  const [postSelectValue, setPostSelectValue] = useState(selectValue);
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setPostContent] = useState(content);

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setPostSelectValue(event.target.value as string);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostContent(event.target.value);
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
          <MenuItem value="FREE">자유</MenuItem>
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
      <S.StyledButton variant="contained">게시하기</S.StyledButton>
    </S.Container>
  );
};
