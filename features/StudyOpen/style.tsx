import styled from "@emotion/styled";

import { Button, Typography } from "@mui/material";

export const EntierContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 1048px;
`;

export const UpperContainer = styled.div`
  width: 1048px;

  display: flex;
`;
export const LowerContainer = styled.div`
  margin-top: 1rem;

  width: 1048px;
`;

export const TextFieldContainer = styled.div`
  width: 524px;

  display: flex;
  flex-direction: column;

  background-color: white;
`;

export const TextFieldWrapper = styled.div`
  width: 524px;
  height: 72px;
`;

export const ThumbnailContainer = styled.div`
  width: 524px;

  background-color: white;
`;

export const ThumbnailForm = styled.form`
  width: 524px;

  padding-left: 1rem;
`;

export const ThumbnailTypo = styled(Typography)`
  margin: 0.5rem;
  padding: 0.4rem;

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
  margin-top: 1.5rem;

  border: 1px solid black;
  border-radius: 0.5rem;

  padding: 0.5rem;

  &:hover {
    border: 1px solid black;
    border-radius: 0.5rem;
  }
`;

export const StudyOpenButton = styled(Button)`
  margin-top: 1rem;
`;
