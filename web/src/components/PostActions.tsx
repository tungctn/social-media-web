"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { MouseEventHandler } from "react";
import { FaEllipsis, FaXmark } from "react-icons/fa6";
import OptionsBox from "./OptionsBox";

export default function PostActions() {
  const {
    ref: actionsRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const handleClickClose: any = () => {
    setIsComponentVisible(false);
  };

  const handleClickButton: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <div className="relative">
      <div
        className="text-deep-lilac cursor-pointer 3xl:text-[25px] text-[calc(25px/6*5)] my-auto"
        onClick={handleClickButton}
      >
        <FaEllipsis />
      </div>
      <OptionsBox
        actionsRef={actionsRef}
        open={isComponentVisible}
        onClose={handleClickClose}
        options={[
          {
            label: "Bookmark",
          },
          {
            label: "Report",
            danger: true,
          },
        ]}
      />
    </div>
  );
}
