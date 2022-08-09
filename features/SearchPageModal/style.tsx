import styled from "@emotion/styled";

export const ModalContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: white;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  padding: 2rem;
`;

export const ButtonContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const ModalDescription = styled.p`
  margin: 1rem 0;
`;
