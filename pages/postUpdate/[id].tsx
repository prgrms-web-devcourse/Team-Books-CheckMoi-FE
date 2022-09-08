import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPost } from "../../apis";
import { PostForm } from "../../features";

interface PostType {
  id: number;
  title: string;
  content: string;
  category: string;
  studyId: number;
  writerId: number;
  writer: string;
  writerImage: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

const postUpdatePage = () => {
  const router = useRouter();
  const id = Number(router.query.id as string);
  const [post, setPost] = useState({} as PostType);

  useEffect(() => {
    const getPostApi = async (postId: number) => {
      const postData = await getPost(postId);
      setPost(postData);
    };
    if (id) getPostApi(id);
  }, [id, post]);

  return (
    <div>
      {post.id && (
        <PostForm
          state="PUT"
          selectValue={post.category}
          postId={post.id}
          title={post.title}
          content={post.content}
          studyId={post.studyId}
        />
      )}
    </div>
  );
};

export default postUpdatePage;
