"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { MouseEventHandler } from "react";
import { FaEllipsis, FaXmark } from "react-icons/fa6";
import OptionsBox from "./OptionsBox";
import { useSelector } from "react-redux";
import usePostModal from "@/hooks/usePostModal";
import Post from "@/utils/fakeData/Post";
import { deletePost } from "@/services/postService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type PostActionsProps = {
  user_id?: number;
  postDetail?: Post;
};

export default function PostActions({ user_id, postDetail }: PostActionsProps) {
  const {
    ref: actionsRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const auth = useSelector((state: any) => state.auth);
  const router = useRouter();
  const postModal = usePostModal();

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
            label: auth.user.user_id == user_id ? "Edit" : "Bookmark",
            onClick: () => {
              if (auth.user.user_id == user_id) {
                postModal.onEdit(postDetail);
              }
            },
          },
          {
            label: auth.user.user_id == user_id ? "Delete" : "Report",
            onClick: () => {
              if (auth.user.user_id == user_id) {
                deletePost(Number(postDetail?.id)).then((res) => {
                  toast.success("Xóa bài viết thành công!");
                  router.refresh();
                });
              }
            },
            danger: true,
          },
        ]}
      />
    </div>
  );
}
