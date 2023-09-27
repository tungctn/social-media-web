import Post from "@/utils/fakeData/Post";
import Image from "next/image";
import { FaRegMessage, FaRegThumbsUp } from "react-icons/fa6";

type ShortPostCardProps = {
  post: Post;
};

export default function ShortPostCard({ post }: ShortPostCardProps) {
  return (
    <div className="relative cursor-pointer">
      <Image
        src={post.images[0]}
        alt=""
        width={267}
        height={267}
        className="3xl:w-[267px] w-[calc(267px/6*5)] 3xl:h-[267px] h-[calc(267px/6*5)] rounded-[10px] object-cover border-[1.5px] border-deep-lilac"
      />
      <div className="h-full w-full rounded-[10px] bg-spanish-gray/80 flex items-center justify-center absolute top-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="text-deep-lilac 3xl:text-2xl text-xl flex flex-row 3xl:gap-10 gap-5">
          <div className="flex flex-row gap-2 items-center">
            <span className="3xl:text-[30px] text-[calc(30px/6*5)]">
              <FaRegThumbsUp />
            </span>
            <span>{post.likes}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span className="3xl:text-[30px] text-[calc(30px/6*5)]">
              <FaRegMessage />
            </span>
            <span>{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}