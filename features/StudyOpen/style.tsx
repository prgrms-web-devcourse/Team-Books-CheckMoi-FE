import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
`;

export const ThumbnailForm = styled.form`
  width: 100%;

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
  &:hover {
    border: 1px solid black;
    border-radius: 0.5rem;
  }
`;
