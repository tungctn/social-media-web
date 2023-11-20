"use client";
import PostCard from "@/components/PostCard";
import { useSelector } from "react-redux";

export default function PostsList() {
  const postState = useSelector((state: any) => state.postState);

  return (
    <div className="flex flex-col gap-6">
      {postState.posts.map((post: any, index: any) => {
        return <PostCard key={index} post={post} />;
      })}
    </div>
  );
}
