import { MouseEventHandler } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

type BoxHeaderProps = {
  title: string;
  onMore?: MouseEventHandler<HTMLDivElement>;
};

export default function BoxHeader({ title, onMore }: BoxHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <span className="text-[32px] text-deep-lilac font-bold">{title}</span>
      <div
        className="text-deep-lilac cursor-pointer transition-all duration-300 hover:translate-x-1"
        onClick={onMore}
      >
        <FaArrowRightLong size={24} />
      </div>
    </div>
  );
}
