"use client";

import React, { useEffect, useState } from "react";
import ReactsBox from "./ReactsBox";
import useComponentVisible from "@/hooks/useComponentVisible";
import { ReactType, getReactTypeSpec } from "@/constants/Others";
import { reactComment, unReactComment } from "@/services/commentServices";

type CommentReactsProps = {
  commentId: number;
  defaultReact?: ReactType;
  onReact: Function;
};

export default function CommentReacts({
  commentId,
  defaultReact,
  onReact,
}: CommentReactsProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false, "mouseout");
  const [currentReact, setCurrentReact] = useState<ReactType | undefined>();

  useEffect(() => {
    defaultReact && setCurrentReact(defaultReact);
  }, [defaultReact]);

  const handleReact = async (reactType: ReactType) => {
    if (reactType !== defaultReact) {
      const res: any = await reactComment({
        type_react: reactType,
        comment_id: commentId,
      });
      if (res.success) {
        setCurrentReact(reactType);
        onReact(reactType);
      }
    } else {
      const res: any = await unReactComment(commentId);
      if (res.success) {
        setCurrentReact(undefined);
        onReact(null);
      }
    }
  };

  const handleHoverReactsBox = () => {
    setIsComponentVisible(true);
  };
  return (
    <div className="relative" onMouseOver={handleHoverReactsBox}>
      <button className={currentReact ? "text-deep-lilac" : "text-inherit"}>
        {currentReact ? getReactTypeSpec(currentReact).label : "Like"}
      </button>
      <div
        className={
          "absolute -left-[11px] " + (isComponentVisible ? "" : "hidden")
        }
        ref={ref}
      >
        <ReactsBox onReact={handleReact} />
      </div>
    </div>
  );
}
