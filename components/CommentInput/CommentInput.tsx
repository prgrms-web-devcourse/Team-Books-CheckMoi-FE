import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import type { ChangeEvent } from "react";
import * as S from "./style";

export const CommentInput = () => {
  // TODO Input -> text Field?
  // TODO Submit Button
  // TODO Style
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendButtonClick = () => {
    // TODO 게시글 API
    console.log("Button Click!", inputValue);
    setInputValue("");
  };

  return (
    <TextField
      multiline
      maxRows={4}
      value={inputValue}
      onChange={handleInputChange}
      placeholder="댓글을 입력해주세요."
      margin="normal"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              color="primary"
              onClick={handleSendButtonClick}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onKeyDown={(e) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter") {
          if (e.shiftKey) return;
          e.preventDefault();
          setInputValue("");
        }
      }}
    />
  );
};
