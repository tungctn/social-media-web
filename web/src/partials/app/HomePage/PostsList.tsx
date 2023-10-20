"use client";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/services/postService";
// import { posts } from "@/utils/fakeData/Post";
import { useEffect, useState } from "react";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.data.posts);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post, index) => {
        return <PostCard key={index} post={post} />;
      })}
    </div>
  );
}
