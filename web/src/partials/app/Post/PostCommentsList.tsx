import { default as CommentType } from "@/utils/fakeData/Comment";
import Comment from "@/components/Comment";

type PostCommentsListProps = {
  comments: CommentType[];
};

export default function PostCommentsList({ comments }: PostCommentsListProps) {
  return (
    <div className="3xl:my-5 my-4 flex flex-col 3xl:gap-5 gap-4">
      {comments.map((comment: CommentType) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </div>
  );
}
