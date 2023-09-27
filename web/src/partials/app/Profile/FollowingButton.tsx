import { FaChevronDown } from "react-icons/fa6";

export default function FollowingButton() {
  return (
    <div>
      <button
        type="button"
        title="following"
        className="text-deep-lilac rounded-[5px] bg-white h-10 3xl:w-[157px] w-[calc(157px/6*5)] flex flex-row items-center text-[14px] border border-deep-lilac"
      >
        <span className="w-full">Following</span>
      </button>
    </div>
  );
}
