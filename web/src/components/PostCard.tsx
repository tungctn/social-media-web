"use client";

import Post from "@/utils/fakeData/Post";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import PostActions from "./PostActions";
import Image from "next/image";
import Link from "next/link";
import PostReacts from "./PostReacts";
import PostReactCounts from "./PostReactCounts";
import PostDetail from "@/partials/app/Post/PostDetail";
import { useState } from "react";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };
  return (
    <>
      {post && (
        <div className="bg-white rounded-[30px] shadow-custom">
          <div className="pt-6 px-6 flex flex-row items-start justify-between">
            <div className="flex flex-row gap-[14px] items-center">
              <Link href={`/profile/${post.userId}`}>
                <Avatar size={50} src={post.user.avatar_url} />
              </Link>
              <div className="flex flex-col">
                <Link href={`/profile/${post.userId}`}>
                  <span className="text-xl text-deep-lilac font-bold">
                    {post.user.full_name}
                  </span>
                </Link>
                <time className="first-letter:uppercase text-xs text-spanish-gray">
                  {dayjs(post.createdAt).format("dddd, HH:mm DD/MM/YYYY")}
                </time>
              </div>
            </div>
            <PostActions />
          </div>
          <p className="px-6 py-[18px]">{post.caption}</p>
          <div className="flex flex-row w-full cursor-pointer" onClick={handleShowDetail}>
            <Image
              src={post.images[0]}
              alt=""
              className={
                "h-[500px] object-cover " +
                (post.images.length > 1 ? "w-[50%]" : "w-full")
              }
              width={800}
              height={500}
            />
            {post.images[1] && (
              <div
                className={
                  "w-[50%] " +
                  (post.images.length > 2
                    ? "relative before:content-[''] before:block before:absolute before:w-full before:h-full before:bg-[rgba(0,0,0,.28)] before:top-0 before:left-0"
                    : "")
                }
              >
                <span className="absolute 3xl:text-[32px] text-2xl text-white font-bold top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  + {post.images.length > 2 ? post.images.length - 2 : ""}
                </span>
                <Image
                  src={post.images[1]}
                  alt=""
                  className="w-full h-[500px] object-cover"
                  width={800}
                  height={500}
                />
              </div>
            )}
          </div>
          <div className="text-[14px] px-6">
            <div className="pt-[7px] pb-[19px] border-b-[1px] border-b-light-silver">
              <PostReactCounts
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                iconCustomClassName="3xl:text-[30px] text-[calc(30px/6*5)]"
                customClassName="leading-0"
              />
            </div>
            <div className="pt-3 pb-[21px]">
              <PostReacts
                iconCustomClassName="3xl:text-[30px] text-[calc(30px/6*5)]"
                customClassName="leading-0"
                postId={post.id}
              />
            </div>
          </div>
        </div>
      )}
      {post && showDetail && (
        <PostDetail
          open={showDetail}
          onClose={() => setShowDetail(false)}
          id={post.id}
        />
      )}
    </>
  );
}
