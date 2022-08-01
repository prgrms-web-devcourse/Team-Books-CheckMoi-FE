import { styled } from "@mui/material/styles";

// TODO 레이아웃 결정되면 수치 수정하기
export const ContentContainer = styled("div")`
  /* margin: calc(64px + 4rem) 4rem 64px; */
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledUl = styled("ul")`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;

export const StyledList = styled("li")`
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;
