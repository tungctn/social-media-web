"use client";

import Comment from "@/utils/fakeData/Comment";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import { FaEllipsis } from "react-icons/fa6";
import { useState } from "react";

type CommentProps = {
  comment: Comment;
  avatarSize?: number;
  userNameClassName?: string;
  createdAtClassName?: string;
};

export default function Comment({
  comment,
  avatarSize = 50,
  userNameClassName = "",
  createdAtClassName = "",
}: CommentProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const handleShowReplies = () => {
    setShowReplies(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-row gap-[10px] items-center">
        <Avatar size={avatarSize} />
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span
              className={"3xl:text-xl text-base font-bold " + userNameClassName}
            >
              {comment.user.full_name}
            </span>
            <span
              className={
                "first-letter:uppercase text-spanish-gray text-xs " +
                createdAtClassName
              }
            >
              {dayjs(comment.createdAt).format("dddd, HH:mm DD/MM/YYYY")}
            </span>
          </div>
        </div>
      </div>
      <div className="3xl:pl-[calc(50px+10px)] pl-[calc(50px/6*5+10px)] w-full flex flex-col gap-2">
        <div className="flex flex-row gap-[9px]">
          <div className="bg-lavender px-4 pt-4 pb-[14px] rounded-[10px] w-full flex flex-col gap-2">
            <p className="pb-0">{comment.content}</p>
            <div className="text-spanish-gray text-xs font-bold flex flex-row 3xl:gap-[53px] gap-[calc(53px/4*3)] justify-end">
              <button
                className={isLiked ? "text-deep-lilac" : "text-inherit"}
                onClick={handleLike}
              >
                {isLiked ? "Liked" : "Like"}
              </button>
              <button>Reply</button>
            </div>
          </div>
          <div className="3xl:text-xl text-lg text-deep-lilac min-w-fit">
            <FaEllipsis />
          </div>
        </div>
        {comment.comments ? (
          !showReplies ? (
            <div
              className="flex flex-row cursor-pointer gap-[11px] items-center before:content-[''] before:block before:3xl:w-[117px] before:w-[calc(117px/6*5)] before:h-[1px] before:bg-spanish-gray"
              onClick={handleShowReplies}
            >
              <span className="text-[14px] text-spanish-gray">
                Watch the reply ({comment.comments?.length})
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {comment.comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    userNameClassName="!text-[14px] !leading-[16px]"
                    createdAtClassName="!text-[10px] !leading-[12px]"
                    avatarSize={40}
                  />
                );
              })}
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
