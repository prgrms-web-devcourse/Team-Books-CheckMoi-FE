import styled from "@emotion/styled";

export const Container = styled.div`
  height: 32rem;
  display: flex;
  animation-name: appear;
  animation-duration: 1.5s;

  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(-2rem);
    }
    to {
      opacity: 1;
    }
  }
`;

export const HomeUIContent = styled.div`
  max-width: 50%;
  flex-grow: 1;
`;

export const HomeUIBook1 = styled.img`
  max-height: 16rem;
`;

export const HomeUIBook2 = styled.img`
  max-height: 16rem;
  position: relative;
  top: 8rem;
  left: 2rem;
`;

export const HomeUIBook3 = styled.img`
  max-height: 16rem;
  position: relative;
  top: 16rem;
  left: 4rem;
`;
