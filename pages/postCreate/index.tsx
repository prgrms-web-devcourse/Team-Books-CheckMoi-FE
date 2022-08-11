import { PostForm } from "../../features";

const PostCreatePage = () => {
  // TODO selectValue와 studyId 전달받아서 넣어주기
  return (
    <PostForm
      state="POST"
      postId={-1}
      selectValue="NOTICE"
      title=""
      content=""
      studyId={1}
    />
  );
};

export default PostCreatePage;
