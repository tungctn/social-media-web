"use client";

import PostDetail from "@/partials/app/Post/PostDetail";
import Post from "@/utils/fakeData/Post";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegMessage, FaRegThumbsUp } from "react-icons/fa6";
import NoImg from "@/assets/imgs/no-image.jpg";

type ShortPostCardProps = {
  post: Post;
};

export default function ShortPostCard({ post }: ShortPostCardProps) {
  const [p, setP] = useState<any>(post);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setP(post);
  }, [post]);

  const handleClick = () => {
    setShowDetail(true);
  };

  const handleChangeDetail = (changedField: any) => {
    if (changedField.isAction) {
      if (!changedField.isActed) {
        setP(null);
      }
    } else {
      const newPost = { ...p, ...changedField };
      setP(newPost);
    }
  };
  return (
    <>
      {p && (
        <div className="relative cursor-pointer" onClick={handleClick}>
          <div className="3xl:w-[267px] 2xl:w-[calc(267px/6*5)] xl:w-[calc(267px/4*3)] w-[calc(267px/3*2)] 3xl:h-[267px] 2xl:h-[calc(267px/6*5)] xl:h-[calc(267px/4*3)] h-[calc(267px/3*2)]">
            <Image
              src={
                p.images.length > 0
                  ? p.images[0].url
                  : p.share_post?.images?.length > 0
                  ? p.share_post.images[0].url
                  : NoImg
              }
              alt=""
              width={267}
              height={267}
              className="rounded-[10px] object-cover border-[1.5px] border-deep-lilac w-full h-full"
            />
          </div>
          <div className="h-full w-full rounded-[10px] bg-spanish-gray/80 flex items-center justify-center absolute top-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div className="text-deep-lilac 3xl:text-2xl text-xl flex flex-row 3xl:gap-10 gap-5">
              <div className="flex flex-row gap-2 items-center">
                <span className="3xl:text-[30px] text-[calc(30px/6*5)]">
                  <FaRegThumbsUp />
                </span>
                <span>{p.likes_count}</span>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <span className="3xl:text-[30px] text-[calc(30px/6*5)]">
                  <FaRegMessage />
                </span>
                <span>{p.comments_count}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDetail && p && (
        <PostDetail
          open={showDetail}
          onClose={() => setShowDetail(false)}
          id={p.id}
          onChange={handleChangeDetail}
        />
      )}
    </>
  );
}
