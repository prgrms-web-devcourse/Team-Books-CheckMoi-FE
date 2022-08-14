export interface CommentsType {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userImage: string;
  userName: string;
}

export interface ResponseCommentsType {
  comments: CommentsType[];
  totalPage: number;
}
