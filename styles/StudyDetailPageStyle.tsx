import styled from "@emotion/styled";

export const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  @media screen and (max-width: 512px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-self: ${(props) =>
    props.className === "owner" ? "flex-start" : "flex-end"};
  @media screen and (max-width: 512px) {
    & Button {
      font-size: 0.8rem;
    }
  }
`;

export const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: start;
  -webkit-padding-start: 0px;

  @media screen and (max-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 512px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledList = styled.li`
  justify-self: center;
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;

export const NoPost = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  margin-top: 4.5rem;
  justify-content: center;
`;
