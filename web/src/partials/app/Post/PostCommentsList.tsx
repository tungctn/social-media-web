import { commentsByPostId } from "@/utils/fakeData/Comment";
import Comment from "@/components/Comment";

export default function PostCommentsList() {
  return (
    <div className="3xl:my-5 my-4 flex flex-col 3xl:gap-5 gap-4">
      {commentsByPostId.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </div>
  );
}
