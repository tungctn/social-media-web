"use client";

import ShortPostCard from "@/components/ShortPostCard";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Post from "@/utils/fakeData/Post";
import { useEffect, useLayoutEffect, useRef } from "react";

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts }: PostsListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (ref.current) {
      if (width >= BREAKPOINTS.extraLarge) {
        ref.current.style.gap = `${
          (ref.current.offsetWidth - 267 * 3) / 2 - 0.5
        }px`;
      } else {
        ref.current.style.gap = `${
          (ref.current.offsetWidth - (267 / 6) * 5 * 3) / 2 - 0.5
        }px`;
      }
    }
  }, [width]);

  return (
    <div ref={ref} className="w-full flex flex-row flex-wrap">
      {posts?.map((post) => {
        return <ShortPostCard key={post.id} post={post} />;
      })}
    </div>
  );
}
