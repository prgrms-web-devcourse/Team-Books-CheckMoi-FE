import { Topbar } from "../../features/Topbar";
import { ContentContainer, ContentWrapper } from "./ContentWrapper";

const LayoutTestPage = () => {
  return (
    <>
      <Topbar />
      <ContentContainer>
        <ContentWrapper>TestPage Content</ContentWrapper>
      </ContentContainer>
    </>
  );
};

export default LayoutTestPage;
