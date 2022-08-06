import styled from "@emotion/styled";

// TODO 레이아웃 결정되면 수치 수정하기
// TODO 모바일뷰에서 margin 수치 수정하기
export const ContentContainer = styled.div`
  margin: calc(64px + 4rem) 4rem 64px;
  @media (max-width: 512px) {
    margin: 5rem 0 1rem 0;
  }
`;
