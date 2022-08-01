import { styled } from "@mui/material/styles";

export const MainPageWrapper = styled("div")`
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

export const StyledSpan = styled("span")`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const BookListWrapper = styled("div")`
  margin-bottom: 4rem;
`;
