"use client";

import BoxHeader from "@/components/BoxHeader";
import Image from "next/image";
import MonsterImg from "@/assets/imgs/monster-1.png";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { getNewestPost } from "@/services/postService";
import NoImg from "@/assets/imgs/no-image.jpg";
import NoPost from "@/assets/imgs/no-nearest-post.png";
import PostDetail from "../Post/PostDetail";
import PostContent from "@/components/PostContent";
import usePostModal from "@/hooks/usePostModal";

export default function NeareastPost() {
  const [nearestPost, setNearestPost] = useState<any>();
  const [showDetail, setShowDetail] = useState(false);
  const postModal = usePostModal();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getNewestPost();

    setNearestPost(res.data.posts);
  };

  const handleMore = () => {
    nearestPost && setShowDetail(true);
  };

  const handleEdit = () => {};

  const handleAdd = () => {
    postModal.onOpen();
  };

  return (
    <>
      <div className="bg-white rounded-[30px] pt-[30px] pb-[17px] px-[30px] max-w-full">
        <BoxHeader title="Nearest Post" onMore={() => handleMore()} />
        <div className="flex flex-row mt-3 gap-9 max-w-full">
          {nearestPost ? (
            <>
              <div
                onClick={() => setShowDetail(true)}
                className="min-w-[140px] relative cursor-pointer"
              >
                <Image
                  src={
                    nearestPost.images[0]?.url
                      ? nearestPost.images[0].url
                      : NoImg
                  }
                  alt={"post-" + nearestPost.id}
                  className="h-[113px] object-cover rounded-[10px] z-10 relative"
                  width={140}
                  height={113}
                />
                {nearestPost.images.length > 1 && (
                  <div className="h-[113px] w-full absolute bg-light-silver rounded-[10px] -top-[5px] left-5">
                    <span className="translate-y-[52px] -translate-x-[5px] float-right text-deep-lilac text-xs font-bold">
                      +{nearestPost.images.length - 1}
                    </span>
                  </div>
                )}
              </div>
              {nearestPost.content ? (
                <div className="">
                  <p className="text-xs line-clamp-3 text-ellipsis h-fit">
                    <PostContent text={nearestPost.content} />
                  </p>
                </div>
              ) : (
                <div className="min-w-fit">
                  <span className="font-bold text-2xl text-spanish-gray min-w-fit">
                    No caption
                  </span>
                  <div className="mt-[6px]">
                    <Image
                      src={MonsterImg}
                      alt="no-caption"
                      className="-mb-[3.015px] mx-auto z-10 relative"
                    />
                    <Button
                      onClick={handleEdit}
                      customClassName="!text-xs !h-[30px] !rounded-[10px]"
                    >
                      Add caption
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-[78px]">
                <Image
                  src={NoPost}
                  alt=""
                  className="h-[117px] w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-evenly">
                <span className="font-bold text-spanish-gray 3xl:text-xl text-[calc(20px/6*5)]">
                  Do not have any post yet
                </span>
                <Button
                  onClick={handleAdd}
                  customClassName="3xl:!text-[12px] !text-[calc(12px/6*5)] 3xl:!h-[32px] !h-[calc(32px/6*5)] !rounded-[10px]"
                >
                  Add the first post
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {nearestPost && showDetail && (
        <PostDetail
          open={showDetail}
          id={nearestPost.id}
          onClose={() => setShowDetail(false)}
          onChange={() => {}}
        />
      )}
    </>
  );
}
