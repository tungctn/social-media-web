import Post from "@/utils/fakeData/Post";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import {
  FaRegMessage,
  FaRegShareFromSquare,
  FaRegThumbsUp,
  FaThumbsUp,
} from "react-icons/fa6";
import PostActions from "./PostActions";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <>
      {post && (
        <div className="bg-white rounded-[30px] shadow-custom">
          <div className="pt-6 px-6 flex flex-row items-start justify-between">
            <div className="flex flex-row gap-[14px] items-center">
              <Link href={`/profile/${post.userId}`}>
                <Avatar size={50} src={post.user.avatar} />
              </Link>
              <div className="flex flex-col">
                <Link href={`/profile/${post.userId}`}>
                  <span className="text-xl text-deep-lilac font-bold">
                    {post.user.username}
                  </span>
                </Link>
                <time className="first-letter:uppercase text-xs text-spanish-gray">
                  {dayjs(post.createdAt).format("dddd, HH:mm DD/MM/YYYY")}
                </time>
              </div>
            </div>
            <PostActions />
          </div>
          <p className="px-6 py-[18px]">{post.caption}</p>
          <div>
            <Image
              src={post.images[0]}
              alt=""
              className="w-full h-[500px] object-cover"
              width={800}
              height={500}
            />
          </div>
          <div className="text-[14px] px-6">
            <div className="flex flex-row items-center justify-between border-b-light-silver pt-[7px] pb-[19px] text-spanish-gray border-b-[1px]">
              <div className="flex flex-row gap-[5px] items-center cursor-pointer">
                <div className="text-lenurple transition-all ease-linear hover:animate-shaking-like hover:scale-105">
                  <FaThumbsUp size={30} />
                </div>
                <span>{post.likes} Likes</span>
              </div>
              <div className="flex flex-row gap-[11px]">
                <span className="cursor-pointer">{post.comments} Comments</span>
                <span className="cursor-pointer">{post.shares} Shares</span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-around text-spanish-gray pt-3 pb-[21px]">
              <div className="flex flex-row gap-[5px] items-center cursor-pointer">
                <div className="transition-all ease-linear hover:text-deep-lilac hover:scale-105 hover:animate-shaking-like">
                  <FaRegThumbsUp size={30} />
                </div>
                Like
              </div>
              <div className="flex flex-row gap-[5px] items-center cursor-pointer">
                <div className="transition-all ease-linear hover:text-deep-lilac hover:scale-105 hover:animate-shaking-like">
                  <FaRegMessage size={30} />
                </div>
                Comment
              </div>
              <div className="flex flex-row gap-[5px] items-center cursor-pointer">
                <div className="transition-all ease-linear hover:text-deep-lilac hover:scale-105 hover:animate-shaking-like">
                  <FaRegShareFromSquare size={30} />
                </div>
                Share
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
