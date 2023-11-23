import { FaThumbsUp } from "react-icons/fa6";

type PostReactCountsProps = {
  likes: number;
  comments: number;
  shares: number;
  iconCustomClassName?: string;
  customClassName?: string;
};

export default function PostReactCounts({
  likes,
  comments,
  shares,
  iconCustomClassName,
  customClassName,
}: PostReactCountsProps) {
  return (
    <div
      className={`flex flex-row items-center justify-between text-spanish-gray 
        ${customClassName && customClassName}`}
    >
      <div className="flex flex-row gap-[5px] items-end cursor-pointer">
        <div
          className={`text-lenurple transition-all ease-linear hover:animate-shaking-like hover:scale-105 
            ${iconCustomClassName && iconCustomClassName}`}
        >
          <FaThumbsUp />
        </div>
        <span>{likes} Likes</span>
      </div>
      <div className="flex flex-row gap-[11px]">
        <span className="cursor-pointer">{comments} Comments</span>
        <span className="cursor-pointer">{shares} Shares</span>
      </div>
    </div>
  );
}
