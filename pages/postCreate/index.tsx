import { useState } from "react";
import { MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import * as S from "../../styles/PostCreatePageStyle";

const PostCreatePage = () => {
  const [selectValue, setSelectValue] = useState("NOTION");
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectValue(event.target.value as string);
  };
  return (
    <S.Container>
      <S.Title>
        <S.StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          onChange={handleChange}
        >
          <MenuItem value="NOTION">공지</MenuItem>
          <MenuItem value="FREE">자유</MenuItem>
        </S.StyledSelect>
        <S.StyledTextField
          name="title"
          variant="standard"
          placeholder="제목을 입력해주세요"
          margin="dense"
          fullWidth
        />
      </S.Title>
      <TextField
        name="content"
        variant="outlined"
        placeholder="내용을 입력해주세요"
        multiline
        minRows={15}
        margin="dense"
      />
      <S.StyledButton variant="contained">게시하기</S.StyledButton>
    </S.Container>
  );
};

export default PostCreatePage;
