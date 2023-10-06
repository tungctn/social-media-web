import PostCard from "@/components/PostCard";
import Post from "@/utils/fakeData/Post";

type PostResultsListProps = {
  posts: Post[];
};

export default function PostResultsList({ posts }: PostResultsListProps) {
  return (
    <div>
      <h2 className="font-bold 3xl:text-2xl text-lg text-deep-lilac w-fit -translate-x-full pr-4 mb-[25px]">
        Posts
      </h2>
      <div className="flex flex-col gap-5">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}
