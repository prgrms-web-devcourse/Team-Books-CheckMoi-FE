import styled from "@emotion/styled";

interface SpacerProps {
  size: number;
}

export const Conatiner = styled.div<SpacerProps>`

  margin: ${({ size }) => `${size}rem`} 0;
`;
