"use client";

import Comment from "@/utils/fakeData/Comment";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CommentActions from "./CommentActions";
import CommentReacts from "./CommentReacts";
import { ReactType } from "@/constants/Others";

type CommentProps = {
  comment: Comment;
  avatarSize?: number;
  userNameClassName?: string;
  created_atClassName?: string;
  onReply: Function;
  isReply?: boolean;
  onAction?: Function;
};

export default function Comment({
  comment,
  avatarSize = 50,
  userNameClassName = "",
  created_atClassName = "",
  onReply = () => {},
  isReply = false,
  onAction = () => {},
}: CommentProps) {
  const [c, setC] = useState<any>();
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    comment && setC(comment);
  }, [comment]);

  const handleShowReplies = () => {
    setShowReplies(true);
  };

  const handleReply = (comment: any) => {
    setShowReplies(true);
    onReply(comment);
  };

  const handleAction = (type: string) => {
    switch (type) {
      case "delete":
        setC(null);
        onAction(type, comment);
        break;
      case "edit":
        onAction(type, comment);
        break;
      default:
        break;
    }
  };

  const handleReactIcon = (reactType: ReactType | null) => {
    const newCmt = { ...comment, type_react: reactType };
    setC(newCmt);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {c && (
        <>
          <div className="flex flex-row gap-[10px] items-center">
            <Avatar size={avatarSize} src={c?.user?.avatar_url} />
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span
                  className={
                    "3xl:text-xl text-base font-bold " + userNameClassName
                  }
                >
                  {c?.user?.full_name}
                </span>
                <span
                  className={
                    "first-letter:uppercase text-spanish-gray text-xs " +
                    created_atClassName
                  }
                >
                  {dayjs(c?.created_at).format("dddd, HH:mm DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>
          <div className="3xl:pl-[calc(50px+10px)] pl-[calc(50px/6*5+10px)] w-full flex flex-col gap-2">
            <div className="flex flex-row gap-[9px]">
              <div className="bg-lavender px-4 pt-4 pb-[14px] rounded-[10px] w-full flex flex-col gap-2">
                <p className="pb-0">
                  {isReply ? (
                    <Link href={`/profile/${c?.user_id}`}>
                      <b className="text-deep-lilac">{c?.user?.full_name}</b>
                    </Link>
                  ) : (
                    <></>
                  )}
                  {` ${c?.content}`}
                </p>
                <div>
                  {c?.images && c?.images?.length > 0 && (
                    <Image
                      src={c?.images[0]?.url}
                      alt=""
                      width={72}
                      height={48}
                      className="w-[72px] h-[48px] object-contain"
                    />
                  )}
                </div>
                <div className="text-spanish-gray text-xs font-bold flex flex-row 3xl:gap-[53px] gap-[calc(53px/4*3)] justify-end">
                  <CommentReacts
                    commentId={c.id}
                    defaultReact={c.type_react}
                    onReact={handleReactIcon}
                  />
                  <button onClick={() => handleReply(c)}>Reply</button>
                </div>
              </div>
              <CommentActions
                authorId={c.user_id}
                commentId={c.id}
                onChange={handleAction}
              />
            </div>
            {c.replies_comment && c.replies_comment.length > 0 ? (
              !showReplies ? (
                <div
                  className="flex flex-row cursor-pointer gap-[11px] items-center before:content-[''] before:block before:3xl:w-[117px] before:w-[calc(117px/6*5)] before:h-[1px] before:bg-spanish-gray"
                  onClick={handleShowReplies}
                >
                  <span className="text-[14px] text-spanish-gray">
                    Watch the reply ({c?.replies_comment?.length})
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {c?.replies_comment?.map((comment: any) => {
                    return (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        userNameClassName="!text-[14px] !leading-[16px]"
                        created_atClassName="!text-[10px] !leading-[12px]"
                        avatarSize={40}
                        onReply={() => onReply(comment)}
                        isReply={true}
                        onAction={onAction}
                      />
                    );
                  })}
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}
