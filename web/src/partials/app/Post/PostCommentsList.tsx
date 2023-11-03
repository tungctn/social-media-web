import { default as CommentType } from "@/utils/fakeData/Comment";
import Comment from "@/components/Comment";
import { useEffect, useState } from "react";
import { getComments } from "@/services/commentServices";

type PostCommentsListProps = {
  postId: number;
  onReply: Function;
  newComment?: any;
};

export default function PostCommentsList({
  postId,
  onReply,
  newComment,
}: PostCommentsListProps) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (newComment) {
      let newComments = [...comments];
      if (newComment.comment_reply) {
        const index = newComments.findIndex(
          (comment) =>
            comment.id === newComment.comment_reply ||
            comment?.replies_comment?.find(
              (cm: any) => cm.id === newComment.comment_reply,
            ),
        );
        newComments[index].replies_comment = [
          ...(newComments[index].replies_comment ?? []),
          newComment,
        ];
      } else {
        newComments = [newComment, ...comments];
      }
      setComments(newComments);
    }
  }, [newComment]);

  useEffect(() => {
    postId && getCommentsData();
  }, [postId]);

  const getCommentsData = async () => {
    const res = await getComments(postId);
    setComments(res.data.comments);
  };

  return (
    <div className="3xl:my-5 my-4 flex flex-col 3xl:gap-5 gap-4">
      {comments?.map((comment: CommentType) => {
        return <Comment onReply={onReply} comment={comment} key={comment.id} />;
      })}
    </div>
  );
}
