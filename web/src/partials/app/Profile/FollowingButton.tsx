import { FaChevronDown } from "react-icons/fa6";

export default function FollowingButton() {
  return (
    <div>
      <button
        type="button"
        title="following"
        className="text-deep-lilac rounded-[5px] bg-white h-10 w-full flex flex-row items-center"
      >
        <span className="w-full">Đang theo dõi</span>
        <span className="mr-[14px]">
          <FaChevronDown size={13} />
        </span>
      </button>
    </div>
  );
}
