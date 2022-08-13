import styled from "@emotion/styled";

export const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35rem;
  max-height: 35rems;
  background-color: white;
  border: 2px solid black;
  box-shadow: 24;
  padding: 1rem;
`;

export const TitleWrapper = styled.div`
  margin-bottom: 1rem;
  & p {
    font-size: 1.5rem;
  }
`;

export const ApplicantList = styled.div`
  height: 25rem;
  overflow: scroll;
`;

export const NoApplicant = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10rem;
`;
