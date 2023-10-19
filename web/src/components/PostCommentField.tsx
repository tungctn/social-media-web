import { createComment } from "@/services/commentServices";
import { forwardRef, useRef } from "react";
import { FaImages, FaRegFaceSmile, FaRegPaperPlane } from "react-icons/fa6";
import { toast } from "react-toastify";

type PostCommentFieldProps = {
  postId: number;
  onSend: Function;
  onChange: Function;
};

function PostCommentField(
  { postId, onSend, onChange }: PostCommentFieldProps,
  ref: any,
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const handleSendComment = async (event: any) => {
    event.preventDefault();
    const newComment = {
      content: event.target.content.value,
      post_id: postId,
      created_at: new Date(),
    };
    try {
      await createComment(newComment);
      onSend(newComment);
      event.target.reset();
      if (textareaRef.current) {
        textareaRef.current.style.height = "";
      }
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleInput = (event: any) => {
    if (textareaRef.current) {
      if (event.target.value !== "") {
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
        onChange(event.target.value);
      } else {
        textareaRef.current.style.height = "";
        onChange(event.target.value);
      }
    }
  };

  const handleKeyDownInput = (event: any) => {
    if (event.key === "Enter") {
      if (submitRef.current) {
        submitRef.current.click();
      }
    }
  };

  return (
    <div
      ref={ref}
      className="min-h-fit border border-s-0 border-e-0 border-b-0 border-t-deep-lilac w-full text-spanish-gray 3xl:px-10 px-8 flex flex-row items-start 3xl:gap-[74px] gap-14"
    >
      <div className="3xl:mt-[13px] mt-[calc(13px/6*5)] flex flex-row 3xl:gap-5 gap-3">
        <button
          title="icon"
          type="button"
          className="3xl:text-[30px] text-[calc(30px/6*5)]"
        >
          <FaRegFaceSmile />
        </button>
        <button
          title="image"
          type="button"
          className="3xl:text-[30px] text-[calc(30px/6*5)]"
        >
          <FaImages />
        </button>
      </div>
      <form
        className="flex flex-row w-full min-h-fit"
        onSubmit={handleSendComment}
      >
        <div className="h-full min-h-fit w-full">
          <textarea
            placeholder="Add comment"
            className="border-0 text-[14px] 3xl:h-[calc(60px-13px)] h-[calc(48px-13px)] pb-0 pt-0 3xl:mt-5 mt-3 w-full placeholder:text-spanish-gray placeholder:font-bold focus:outline-none focus:ring-0 scrollbar-thin resize-none"
            autoFocus
            name="content"
            ref={textareaRef}
            onInput={handleInput}
            onKeyDown={handleKeyDownInput}
          />
        </div>
        <div>
          <button
            title="submit"
            type="submit"
            className="3xl:text-[24px] text-[calc(24px/6*5)] 3xl:mt-4 mt-3"
            ref={submitRef}
          >
            <FaRegPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
}

export default forwardRef(PostCommentField);
