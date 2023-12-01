import useComponentVisible from "@/hooks/useComponentVisible";
import { deleteComment, report } from "@/services/commentServices";
import { FaEllipsis } from "react-icons/fa6";
import { useSelector } from "react-redux";
import DeleteAlert from "./DeleteAlert";
import { useState } from "react";
import { toast } from "react-toastify";
import ReportFormModal from "./ReportFormModal";

type CommentActionsProps = {
  authorId?: number;
  commentId: number;
  onChange: Function;
};

export default function CommentActions({
  authorId,
  commentId,
  onChange,
}: CommentActionsProps) {
  const auth = useSelector((state: any) => state.auth);
  const { ref, setIsComponentVisible, isComponentVisible } =
    useComponentVisible(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const handleOpen = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const handleOpenAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleClickItem = (type: string) => {
    setIsComponentVisible(false);
    switch (type) {
      case "delete":
        handleOpenAlert();
        break;
      case "edit":
        onChange("edit");
        break;
      case "report":
        setShowReport(true);
        break;
      default:
        break;
    }
  };

  const handleOkDel = async () => {
    const res: any = await deleteComment(commentId);

    if (res.success) {
      toast.success("Deleted comment!");
      handleCloseAlert();
      onChange("delete");
    }
  };

  const handleReport = async (event: any) => {
    event.preventDefault();
    const res: any = await report(commentId, {
      type_report: event.target.type_report.value,
    });
    if (res.success) {
      setShowReport(false);
      toast.success("Reported!");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <div
        onClick={handleOpen}
        className="3xl:text-xl text-lg cursor-pointer text-deep-lilac min-w-fit relative"
      >
        <FaEllipsis />
        <div
          className={actionsStyles.root.base}
          style={{
            display: isComponentVisible ? "block" : "none",
          }}
          ref={ref}
        >
          {auth.user?.user_id === authorId ? (
            <>
              <button
                onClick={() => handleClickItem("edit")}
                className={actionsStyles.item.base}
              >
                Edit
              </button>
              <button
                onClick={() => handleClickItem("delete")}
                className={actionsStyles.item.base}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleClickItem("report")}
                className={actionsStyles.item.base}
              >
                Report
              </button>
            </>
          )}
        </div>
      </div>
      <DeleteAlert
        show={showAlert}
        onClose={handleCloseAlert}
        onOk={handleOkDel}
        item="comment"
      />
      <ReportFormModal
        show={showReport}
        onClose={() => setShowReport(false)}
        onSubmit={handleReport}
      />
    </>
  );
}

const actionsStyles = {
  root: {
    base: "absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-900 px-4 bg-white rounded-lg border border-gray-200",
  },
  item: {
    base: "first:rounded-t-lg last:rounded-b-lg last:border-b-0 hover:text-deep-lilac w-full py-2 text-left border-b-[1px] border-solid border-lavender last:border-b-0",
  },
};
