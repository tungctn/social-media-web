"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { MouseEventHandler, useEffect, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import OptionsBox from "./OptionsBox";
import { checkPostSaved, report, savePost, unSavePost } from "@/services/postService";
import { toast } from "react-toastify";

type PostActionsProps = {
  postId: number;
  onChange?: Function;
};

export default function PostActions({
  postId,
  onChange = () => {},
}: PostActionsProps) {
  const {
    ref: actionsRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const [isSaved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    postId && getDefautlSavedOrNot();
  }, [postId]);

  const getDefautlSavedOrNot = async () => {
    const res: any = await checkPostSaved(postId);
    setSaved(res.data.is_save_post);
  };

  const handleClickClose: any = () => {
    setIsComponentVisible(false);
  };

  const handleClickButton: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleBookmark = async () => {
    try {
      let isSuccess = false;
      if (isSaved) {
        const res: any = await savePost(postId);
        isSuccess = res.success;
        toast.success("Removed bookmark!");
      } else {
        const res: any = await savePost(postId);
        isSuccess = res.success;
        toast.success("Add bookmark!");
      }
      if (isSuccess) {
        setSaved(!isSaved);
      }
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleReport = async () => {
    try {
      const res: any = await report(postId);
      if (res.success) {
        toast.success("Reported!");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error!");
    }
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
            label: isSaved ? "Bookmarked" : "Bookmark",
            onClick: handleBookmark,
          },
          {
            label: "Report",
            danger: true,
            onClick: handleReport,
          },
        ]}
      />
    </div>
  );
}
