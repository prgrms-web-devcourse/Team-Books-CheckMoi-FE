import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";

export const Container = styled.div`
  padding: 1rem;

  display: flex;

  width: 1048px;
`;

export const TextFieldContainer = styled.div`
  width: 512px;

  display: flex;
  flex-direction: column;

  margin-right: 1rem;
`;

export const ThumbnailContainer = styled.div`
  width: 512px;
  display: flex;
  flex-direction: column;
`;

export const ThumbnailForm = styled.form`
  width: 512px;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;

  border: 1px solid;
  border-color: #a1a1a1;
  border-radius: 0.5rem;

  box-sizing: border-box;

  &:hover {
    border-color: black;
  }
`;

export const ThumbnailTypo = styled(Typography)`
  margin: 0.5rem;

  color: #a1a1a1;
  border-bottom: 1px solid #a1a1a1;
`;

export const ThumbnailLabel = styled.label`
  width: 100%;

  display: flex;
  justify-content: center;

  cursor: pointer;
`;

export const ImageBox = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;

  &:hover {
    border: 1px solid black;
    border-radius: 0.5rem;
  }
`;

export const StudyOpenButton = styled(Button)`
  width: 144px;

  margin-left: auto;
`;
