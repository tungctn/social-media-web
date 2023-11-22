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
import { useEffect, useState } from "react";
import { ReactType } from "@/constants/Others";
import { reactPost } from "@/utils/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [postDetail, setPostDetail] = useState<Post | undefined>();

  useEffect(() => {
    setPostDetail(post);
  }, [post]);

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const handleChangeReact = (reactType: ReactType) => {
    const newPost: any = postDetail && reactPost(postDetail, reactType);

    setPostDetail(newPost);
  };

  const handleChangeDetail = (changeField: any) => {
    const newPost: any = {
      ...post,
      ...changeField,
    };

    setPostDetail(newPost);
  };
  
  return (
    <>
      {postDetail && (
        <div className="bg-white rounded-[30px] shadow-custom">
          <div className="pt-6 px-6 flex flex-row items-start justify-between">
            <div className="flex flex-row gap-[14px] items-center">
              <Link href={`/profile/${postDetail.user_id}`}>
                <Avatar size={50} src={postDetail.user.avatar_url} />
              </Link>
              <div className="flex flex-col">
                <Link href={`/profile/${postDetail.user_id}`}>
                  <span className="text-xl text-deep-lilac font-bold">
                    {postDetail.user.full_name}
                  </span>
                </Link>
                <time className="first-letter:uppercase text-xs text-spanish-gray">
                  {dayjs(postDetail.created_at).format(
                    "dddd, HH:mm DD/MM/YYYY",
                  )}
                </time>
              </div>
            </div>
            <PostActions
              // postId={postDetail.id}
              // user_id={postDetail?.user_id}
              postDetail={postDetail}
            />
          </div>
          <p className="px-6 py-[18px]">{postDetail.content}</p>
          <div
            className="flex flex-row w-full cursor-pointer"
            onClick={handleShowDetail}
          >
            {!postDetail.share_post &&
              postDetail.images.length > 0 && (
                <Image
                  src={postDetail.images[0].url}
                  alt=""
                  className={
                    "h-[500px] object-cover " +
                    (postDetail.images.length > 1 ? "w-[50%]" : "w-full")
                  }
                  width={800}
                  height={500}
                  data-src={postDetail.images[0].url}
                  data-testid="post-image-1"
                />
              )}

            {postDetail.images.length > 0 && postDetail.images[1] && (
              <div
                className={
                  "w-[50%] " +
                  (postDetail.images.length > 2
                    ? "relative before:content-[''] before:block before:absolute before:w-full before:h-full before:bg-[rgba(0,0,0,.28)] before:top-0 before:left-0"
                    : "")
                }
              >
                <span className="absolute 3xl:text-[32px] text-2xl text-white font-bold top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  +{" "}
                  {postDetail.images.length > 2
                    ? postDetail.images.length - 2
                    : ""}
                </span>
                <Image
                  src={postDetail.images[1].url}
                  alt=""
                  className="w-full h-[500px] object-cover"
                  width={800}
                  height={500}
                  data-src={postDetail.images[1].url}
                  data-testid="post-image-2"
                />
              </div>
            )}

            {postDetail.share_post && (
              <div
                className={
                  postDetail.share_post?.images.length > 0
                    ? "w-full flex flex-row relative"
                    : "w-full flex flex-col"
                }
              >
                <div
                  className={
                    postDetail.share_post?.images.length > 0
                      ? "w-full z-50 bg-black/40 absolute bottom-0 left-0"
                      : "w-full z-50 bg-black/40"
                  }
                >
                  <div className="pt-6 px-6 flex flex-row items-start justify-between">
                    <div className="flex flex-row gap-[14px] items-center">
                      <Link href={`/profile/${postDetail.share_post.user_id}`}>
                        <Avatar
                          size={50}
                          src={postDetail.share_post.user.avatar_url}
                        />
                      </Link>
                      <div className="flex flex-col">
                        <Link
                          href={`/profile/${postDetail.share_post.user_id}`}
                        >
                          <span className="text-xl text-white font-bold">
                            {postDetail.share_post.user.full_name}
                          </span>
                        </Link>
                        <time className="first-letter:uppercase text-xs text-white/40">
                          {dayjs(postDetail.share_post.created_at).format(
                            "dddd, HH:mm DD/MM/YYYY",
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                  <p className="px-6 py-[18px] text-white">
                    {postDetail.share_post.content}
                  </p>
                </div>
                {postDetail.share_post.images.length > 0 && (
                  <Image
                    src={postDetail.share_post.images[0].url}
                    alt=""
                    className={
                      "h-[500px] object-cover " +
                      (postDetail.share_post.images.length > 1
                        ? "w-[50%]"
                        : "w-full")
                    }
                    width={800}
                    height={500}
                    data-src={postDetail.share_post.images[0].url}
                    data-testid="post-image-1"
                  />
                )}

                {postDetail.share_post.images.length > 0 &&
                  postDetail.share_post.images[1] && (
                    <div
                      className={
                        "w-[50%] " +
                        (postDetail.share_post.images.length > 2
                          ? "relative before:content-[''] before:block before:absolute before:w-full before:h-full before:bg-[rgba(0,0,0,.28)] before:top-0 before:left-0"
                          : "")
                      }
                    >
                      <span className="absolute 3xl:text-[32px] text-2xl text-white font-bold top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        +{" "}
                        {postDetail.share_post.images.length > 2
                          ? postDetail.share_post.images.length - 2
                          : ""}
                      </span>
                      <Image
                        src={postDetail.share_post.images[1].url}
                        alt=""
                        className="w-full h-[500px] object-cover"
                        width={800}
                        height={500}
                        data-src={postDetail.share_post.images[1].url}
                        data-testid="post-image-2"
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
          <div className="text-[14px] px-6">
            <div className="pt-[7px] pb-[19px] border-b-[1px] border-b-light-silver">
              <PostReactCounts
                likes={postDetail.likes_count}
                comments={postDetail.comments_count}
                shares={postDetail.shares_count}
                iconCustomClassName="3xl:text-[30px] text-[calc(30px/6*5)]"
                customClassName="leading-0"
              />
            </div>
            <div className="pt-3 pb-[21px]">
              <PostReacts
                iconCustomClassName="3xl:text-[30px] text-[calc(30px/6*5)]"
                customClassName="leading-0"
                postId={postDetail?.id}
                reactType={postDetail.type_react}
                onChange={handleChangeReact}
                content={postDetail?.content}
                images={postDetail?.images}
              />
            </div>
          </div>
        </div>
      )}
      {postDetail && showDetail && (
        <PostDetail
          open={showDetail}
          onClose={() => setShowDetail(false)}
          id={postDetail.id}
          onChange={handleChangeDetail}
        />
      )}
    </>
  );
}
