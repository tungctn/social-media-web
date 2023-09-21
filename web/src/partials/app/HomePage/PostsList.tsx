import PostCard from "@/components/PostCard";
import { posts } from "@/utils/fakeData/Post";

export default function PostsList() {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}
