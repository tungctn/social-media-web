import { FaImages, FaRegFaceSmile, FaRegPaperPlane } from "react-icons/fa6";

export default function PostCommentField() {
  return (
    <div className="3xl:h-[60px] h-12 border border-s-0 border-e-0 border-b-0 border-t-deep-lilac w-full text-spanish-gray 3xl:px-10 px-8 flex flex-row items-start 3xl:gap-[74px] gap-14">
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
      <div className="flex flex-row w-full">
        <div className="h-full w-full">
          <input
            placeholder="Add comment"
            className="border-0 text-[14px] pb-0 pt-0 3xl:mt-5 mt-3 w-full placeholder:text-spanish-gray placeholder:font-bold focus:outline-none focus:ring-0"
            autoFocus
          />
        </div>
        <div>
          <button
            title="submit"
            type="button"
            className="3xl:text-[24px] text-[calc(24px/6*5)] 3xl:mt-4 mt-3"
          >
            <FaRegPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
