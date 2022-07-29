import styled from "@emotion/styled";

interface StudyStateProps {
  color: string;
}
export const StudyState = styled.div`
  min-width: 3rem;
  max-width: 3rem;

  min-height: 2rem;
  max-height: 2rem;
  background-color: ${({ color }) => color};

  padding: 0 0.5rem;

  color: white;
  border-radius: 0.25rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  box-shadow: 8px 8px 8px -3px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;
