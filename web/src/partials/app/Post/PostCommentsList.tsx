import { default as CommentType } from "@/utils/fakeData/Comment";
import Comment from "@/components/Comment";
import { useEffect, useState } from "react";
import { getComments } from "@/services/commentServices";

type PostCommentsListProps = {
  postId: number;
  onReply: Function;
  newComment?: any;
  onAction: Function;
};

export default function PostCommentsList({
  postId,
  onReply,
  newComment,
  onAction,
}: PostCommentsListProps) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    postId && getCommentsData();
  }, [postId, newComment]);

  const getCommentsData = async () => {
    const res = await getComments(postId);
    setComments(res.data.comments);
  };

  return (
    <div className="3xl:my-5 my-4 flex flex-col 3xl:gap-5 gap-4 comments">
      {comments?.map((comment: CommentType) => {
        return (
          <Comment
            onReply={onReply}
            comment={comment}
            key={comment.id}
            onAction={onAction}
          />
        );
      })}
    </div>
  );
}
