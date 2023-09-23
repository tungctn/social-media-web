import { MouseEventHandler } from "react";
import { FaArrowRight } from "react-icons/fa";

type BoxHeaderProps = {
  title: string;
  onMore?: MouseEventHandler<HTMLDivElement>;
};

export default function BoxHeader({ title, onMore }: BoxHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <span className="text-deep-lilac text-2xl font-bold">{title}</span>
      <div
        className="text-deep-lilac cursor-pointer transition-all duration-300 hover:translate-x-1"
        onClick={onMore}
      >
        <FaArrowRight size={24} />
      </div>
    </div>
  );
}
