"use client";

import PostDetail from "@/partials/app/Post/PostDetail";
import { Image as ImageType } from "@/utils/fakeData/Image";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

type StatisticalPostCardProps = {
  reactAmount: number;
  negativeCommentsPercent: number;
  images?: ImageType[];
  postId: number;
};

export default function StatisticalPostCard({
  reactAmount,
  negativeCommentsPercent,
  images = [],
  postId,
}: StatisticalPostCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleSeeMore = () => {
    setShowDetail(true);
  };
  return (
    <>
      <Tooltip
        style="light"
        content="Click to see more"
        animation="duration-1000"
      >
        <div
          onClick={handleSeeMore}
          className="bg-white rounded-[20px] pt-4 pb-9 px-5 3xl:text-base text-[calc(16px*.75)] text-black 3xl:w-[240px] w-[calc(240px*.75)] flex flex-row justify-center"
        >
          <div>
            <div className="3xl:w-[200px] 3xl:h-[152px] w-[calc(200px*.75)] h-[calc(152px*.75)] relative rounded-[20px] bg-light-silver">
              {images?.length > 0 && (
                <Image
                  src={images[0].url}
                  alt=""
                  width={200}
                  height={152}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              )}
              {images.length > 1 && (
                <div className="w-full h-full absolute top-0 left-0 bg-black/40 rounded-[20px] flex items-center justify-center">
                  <span className="text-white font-semibold">
                    + {images.length - 1}
                  </span>
                </div>
              )}
            </div>
            <span className="leading-none mt-[23px] mb-[13px] block">
              Tổng cộng {reactAmount} react
            </span>
            <div>
              Bình luận tiêu cực:{" "}
              <span className="3xl:text-[32px] text-[calc(32px*0.75)] text-deep-lilac font-semibold leading-none">
                {negativeCommentsPercent}%
              </span>
            </div>
          </div>
        </div>
      </Tooltip>
      {showDetail && (
        <PostDetail
          open={showDetail}
          onClose={() => setShowDetail(false)}
          id={postId}
          negativeCommentsPercent={negativeCommentsPercent}
        />
      )}
    </>
  );
}
