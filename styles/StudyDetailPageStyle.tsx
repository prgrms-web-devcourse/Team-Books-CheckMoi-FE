import styled from "@emotion/styled";

export const TabsWrapper = styled.div`
  margin: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  align-items: start;
  -webkit-padding-start: 0px;

  @media (max-width: 512px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledList = styled.li`
  justify-self: center;
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;
