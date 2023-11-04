import { FaRegMessage, FaRegShareFromSquare } from "react-icons/fa6";
import { useState } from "react";
import PostDetail from "@/partials/app/Post/PostDetail";
import ReactsBox from "./ReactsBox";
import useComponentVisible from "@/hooks/useComponentVisible";
import ReactIcon from "./ReactIcon";
import { ReactType } from "@/constants/Others";
import { reactPost, unReactPost } from "@/services/postService";
import { toast } from "react-toastify";

type PostReactsProps = {
  iconCustomClassName?: string;
  customClassName?: string;
  postId: number;
  onComment?: Function;
  reactType: ReactType | undefined;
  onChange: Function;
};

export default function PostReacts({
  iconCustomClassName = "",
  customClassName = "",
  postId,
  onComment = () => {},
  reactType,
  onChange,
}: PostReactsProps) {
  const [showDetail, setShowDetail] = useState(false);
  const {
    ref,
    isComponentVisible: showReactsBox,
    setIsComponentVisible: setShowReactsBox,
  } = useComponentVisible(false, "mouseout");
  const handleComment = () => {
    postId && setShowDetail(true);
    onComment();
  };

  const handleHoverReactsBox = () => {
    setShowReactsBox(true);
  };

  const handleCloseReactsBox = () => {
    setShowReactsBox(false);
  };

  const handleReact = async (rT: ReactType) => {
    try {
      if (rT === reactType) {
        await unReactPost(postId);
      } else {
        await reactPost(postId, rT);
      }
      onChange(rT);
    } catch (error) {
      toast.error("Error!");
    }
    handleCloseReactsBox();
  };
  return (
    <>
      <div
        className={
          "flex flex-row items-center justify-around text-spanish-gray " +
          customClassName
        }
      >
        <div
          className="cursor-pointer leading-0 relative"
          onMouseOver={handleHoverReactsBox}
        >
          <div
            className={
              "absolute -left-[11px] -translate-y-full " +
              (showReactsBox ? "" : "hidden")
            }
            ref={ref}
          >
            <ReactsBox onReact={handleReact} />
          </div>
          <ReactIcon reactType={reactType} />
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
          id={0}
        />
      )}
    </>
  );
}
