"use client";

import useComponentVisible from "@/hooks/useComponentVisible";
import { MouseEventHandler, useEffect, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import OptionsBox from "./OptionsBox";
import {
  checkPostSaved,
  report,
  savePost,
  unSavePost,
} from "@/services/postService";
import { toast } from "react-toastify";
import { CustomFlowbiteTheme, Modal, Radio } from "flowbite-react";
import Button from "./Button";

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
  const [showReportSelect, setShowReportSelect] = useState<boolean>(false);

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

  const handleReport = () => {
    setShowReportSelect(true);
  };

  const handleSubmitReport = async (event: any) => {
    event.preventDefault();
    const type_report = event.target.type_report.value;

    try {
      const res: any = await report(postId, { type_report });
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
      <Modal
        show={showReportSelect}
        onClose={() => setShowReportSelect(false)}
        dismissible={true}
      >
        <Modal.Header>
          Select type of violation
          <p className="text-base font-normal">
            Please select a type of violation. If the article violates both,
            please choose the one that violates the most.
          </p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitReport}>
            <div className="flex flex-col gap-5 mb-4">
              <label className="flex flex-row gap-2 items-center">
                <Radio value={1} name="type_report" theme={customRadioTheme} />
                Content
              </label>
              <label className="flex flex-row gap-2 items-center">
                <Radio value={2} name="type_report" theme={customRadioTheme} />
                Image
              </label>
            </div>
            <Button type="submit">Report</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const customRadioTheme: CustomFlowbiteTheme["radio"] = {
  root: {
    base: "h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-deep-lilac dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-deep-lilac dark:focus:ring-deep-lilac text-deep-lilac",
  },
};
