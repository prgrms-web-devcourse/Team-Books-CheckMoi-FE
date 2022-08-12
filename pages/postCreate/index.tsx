import { useRouter } from "next/router";
import { PostForm } from "../../features";

const PostCreatePage = () => {
  const router = useRouter();
  const { tabNumber, studyId, isOwner } = router.query;

  return (
    <PostForm
      state="POST"
      selectValue={tabNumber ? "GENERIC" : "NOTICE"}
      title=""
      content=""
      studyId={Number(studyId)}
      isOwner={isOwner === "true"}
    />
  );
};

export default PostCreatePage;
