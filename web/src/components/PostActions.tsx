"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { MouseEventHandler, useEffect, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import OptionsBox from "./OptionsBox";
import { useDispatch, useSelector } from "react-redux";
import usePostModal from "@/hooks/usePostModal";
import Post from "@/utils/fakeData/Post";
import { deletePost } from "@/services/postService";
import { toast } from "react-toastify";
import {
  checkPostSaved,
  report,
  savePost,
  unSavePost,
} from "@/services/postService";
import { getPosts } from "@/store/actions/postActions";
import ReportFormModal from "./ReportFormModal";

type PostActionsProps = {
  postDetail?: Post;
  onChange?: Function;
};
export default function PostActions({
  postDetail,
  onChange = () => {},
}: PostActionsProps) {
  const {
    ref: actionsRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const [isSaved, setSaved] = useState<boolean>(false);
  const [showReportSelect, setShowReportSelect] = useState<boolean>(false);
  const auth = useSelector((state: any) => state.auth);
  const postModal = usePostModal();
  const dispatch = useDispatch();
  useEffect(() => {
    postDetail?.id && getDefautlSavedOrNot();
  }, [postDetail]);

  const getDefautlSavedOrNot = async () => {
    const res: any = await checkPostSaved(Number(postDetail?.id));
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
        const res: any = await unSavePost(Number(postDetail?.id));
        isSuccess = res.success;
        onChange(false);
        toast.success("Removed bookmark!");
      } else {
        const res: any = await savePost(Number(postDetail?.id));
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

  const handleReport = () => {
    setShowReportSelect(true);
  };

  const handleSubmitReport = async (event: any) => {
    event.preventDefault();
    const type_report = event.target.type_report.value;

    try {
      const res: any = await report(Number(postDetail?.id), { type_report });
      if (res.success) {
        setShowReportSelect(false);
        toast.success("Reported!");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleEdit = () => {
    postModal.onEdit(postDetail);
    dispatch(getPosts() as any);
  };

  const handleDelete = async () => {
    try {
      await deletePost(Number(postDetail?.id));
      onChange(false);
      toast.success("Deleted!");
      postModal.onClose();
      dispatch(getPosts() as any);
    } catch (error) {
      toast.error("Error!");
    }
  };

  const isCurrentUser =
    postDetail && auth?.user
      ? postDetail?.user_id == auth.user?.user_id
      : false;

  return (
    <>
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
              label: isSaved
                ? "Bookmarked"
                : isCurrentUser
                ? "Edit"
                : "Bookmark",
              onClick: isCurrentUser ? handleEdit : handleBookmark,
            },
            {
              label: isCurrentUser ? "Delete" : "Report",
              danger: true,
              onClick: isCurrentUser ? handleDelete : handleReport,
            },
          ]}
        />
      </div>
      <ReportFormModal
        show={showReportSelect}
        onClose={() => setShowReportSelect(false)}
        onSubmit={handleSubmitReport}
      />
    </>
  );
}
