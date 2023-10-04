import {
  FaRegMessage,
  FaRegShareFromSquare,
  FaRegThumbsUp,
} from "react-icons/fa6";
import { useState } from "react";
import PostDetail from "@/partials/app/Post/PostDetail";

type PostReactsProps = {
  iconCustomClassName?: string;
  customClassName?: string;
  postId: number;
  onComment?: Function;
};

export default function PostReacts({
  iconCustomClassName = "",
  customClassName = "",
  postId,
  onComment = () => {},
}: PostReactsProps) {
  const [showDetail, setShowDetail] = useState(false);
  const handleComment = () => {
    postId && setShowDetail(true);
    onComment();
  };
  return (
    <>
      <div
        className={
          "flex flex-row items-center justify-around text-spanish-gray " +
          customClassName
        }
      >
        <div className="flex flex-row gap-[5px] items-center cursor-pointer leading-0">
          <div
            className={
              "transition-all ease-linear hover:text-deep-lilac hover:scale-105 hover:animate-shaking-like " +
              iconCustomClassName
            }
          >
            <FaRegThumbsUp />
          </div>
          Like
        </div>
        <div
          className="flex flex-row gap-[5px] items-center cursor-pointer leading-0"
          onClick={handleComment}
        >
          <div
            className={
              "transition-all ease-linear hover:text-deep-lilac hover:scale-105 hover:animate-shaking-like " +
              iconCustomClassName
            }
          >
            <FaRegMessage />
          </div>
          Comment
        </div>
        <div className="flex flex-row gap-[5px] items-center cursor-pointer leading-0">
          <div
            className={
              "transition-all ease-linear hover:text-deep-lilac hover:scale-105 hover:animate-shaking-like " +
              iconCustomClassName
            }
          >
            <FaRegShareFromSquare />
          </div>
          Share
        </div>
      </div>
      {showDetail && (
        <PostDetail
          open={showDetail}
          onClose={() => setShowDetail(false)}
          id={postId}
        />
      )}
    </>
  );
}
