import { styled } from "@mui/material/styles";

// TODO 레이아웃 결정되면 수치 수정하기
export const ContentContainer = styled("div")`
  margin: calc(4rem + 4rem) 4rem 4rem;
  @media (max-width: 600px) {
    margin: 4rem 1rem;
  }
`;
