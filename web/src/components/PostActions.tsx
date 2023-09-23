"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { MouseEventHandler } from "react";
import { FaEllipsis, FaXmark } from "react-icons/fa6";

export default function PostActions() {
  const {
    ref: actionsRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(true);

  const handleClickButton: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleClickClose: any = () => {
    setIsComponentVisible(false);
  };

  return (
    <div className="relative">
      <div
        className="text-deep-lilac cursor-pointer"
        onClick={handleClickButton}
      >
        <FaEllipsis size={25} />
      </div>
      <div
        ref={actionsRef}
        tabIndex={-1}
        onBlur={handleClickClose}
        className={`absolute top-[calc(17px+25px)] bg-white rounded-[10px] shadow-[0px_4px_10px_4px_rgba(149,81,186,.24)] -right-[7px] min-w-[169px]${
          !isComponentVisible ? " hidden" : ""
        }`}
      >
        <div className="relative pt-3 px-4 pb-[6px]">
          <div
            className="text-deep-lilac absolute top-[8px] right-[10px]"
            onClick={handleClickClose}
          >
            <FaXmark />
          </div>
          <div>
            <button type="button" className="min-w-fit py-3 font-medium">
              Lưu bài viết
            </button>
            <div className="h-[1px] w-full bg-lavender"></div>
            <button
              type="button"
              className="min-w-fit py-3 text-vivid-red font-medium"
            >
              Báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
