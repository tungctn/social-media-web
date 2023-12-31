"use client";

import ChartSelect from "@/components/ChartSelect";
import Pagination from "@/components/Pagination";
import StatisticalPostCard from "@/components/StatisticalPostCard";
import { TimeStatistics } from "@/constants/Others";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { getPostsWithNegativeComments } from "@/services/adminServices";
import { statisticalPosts } from "@/utils/fakeData/Post";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

export default function PostsBox() {
  const { width } = useWindowDimensions();
  const [posts, setPosts] = useState<any>();
  const [time, setTime] = useState<number>(TimeStatistics.thisYear);
  const [pagesTotal, setPagesTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const listsViewRef = useRef<HTMLDivElement>(null);
  const sizes = useMemo(() => {
    let containerW = (1125 / 6) * 5;
    let paddingW = 92 * 0.75;
    let itemW = 240 * 0.75;
    if (width > BREAKPOINTS.xl3) {
      containerW = (containerW / 5) * 6;
      paddingW /= 0.75;
      itemW /= 0.75;
    }
    return {
      containerW,
      paddingW,
      itemW,
    };
  }, [width]);
  const gap = useMemo(() => {
    return (sizes.containerW - sizes.paddingW * 2 - sizes.itemW * 4) / 3;
  }, [width]);

  useEffect(() => {
    getData();
  }, [time]);

  useEffect(() => {
    if (listsViewRef.current) {
      listsViewRef.current.scrollTo({
        left:
          (currentPage - 1) * (sizes.containerW - sizes.paddingW * 2) +
          gap * (currentPage - 1),
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const getData = async () => {
    const postsRes = await getPostsWithNegativeComments({
      time_statistics: time,
    });
    
    const t = Math.ceil(postsRes.data.data.length / 4);
    setPosts(postsRes.data.data);
    setPagesTotal(t);
  };

  const handleChangeTime = (t: TimeStatistics) => {
    setTime(t);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="pt-10 pb-9 3xl:px-[92px] px-[calc(92px*0.75)] rounded-[20px] bg-deep-lilac w-full relative">
      <div className="flex flex-row justify-between w-full items-center mb-[22px]">
        <h1 className="3xl:text-2xl text-lg font-bold text-white 3xl:-ml-[25px] -ml-[calc(25px*0.75)] leading-none">
          Post
        </h1>
        <ChartSelect onChange={handleChangeTime} />
      </div>
      {pagesTotal > 1 && currentPage !== 1 && (
        <button
          onClick={handlePreviousPage}
          title="previous"
          className="text-[40px] absolute 3xl:left-[27px] left-[calc(27px*.75)] z-20 text-light-silver top-1/2 -translate-y-1/2 transition hover:text-light-silver/80"
        >
          <FaCircleChevronLeft />
        </button>
      )}
      {pagesTotal > 1 && currentPage !== pagesTotal && (
        <button
          onClick={handleNextPage}
          title="next"
          className="text-[40px] absolute text-light-silver 3xl:right-[27px] right-[calc(27px*.75)] top-1/2 -translate-y-1/2 transition hover:text-light-silver/80"
        >
          <FaCircleChevronRight />
        </button>
      )}
      <div
        className="flex flex-row max-w-full w-full overflow-hidden"
        style={{ gap }}
        ref={listsViewRef}
      >
        {pagesTotal <= 1 && posts?.length === 0 && <span className="text-white italic">No post</span>}
        {posts?.map((post: any) => {
          return (
            <StatisticalPostCard
              key={post.id}
              postId={post.id}
              reactAmount={post.likes_count}
              negativeCommentsPercent={
                post.comments_count
                  ? Math.round(post.comments_negative_count / post.comments_count * 100)
                  : 0
              }
              images={post.images}
            />
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        {pagesTotal > 1 && (
          <Pagination
            activePage={currentPage}
            total={pagesTotal}
            onChangePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
}
