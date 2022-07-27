import styled from "@emotion/styled";

interface StyledTestProps {
  string: string;
}

export const StyledTest = styled.div<StyledTestProps>`
  background-color: ${({ string }) => (string ? "black" : "yellow")};
`;
