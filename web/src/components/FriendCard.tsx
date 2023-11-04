"use client";

import User from "@/utils/fakeData/User";
import SquareAvatar from "./SquareAvatar";
import { FaEllipsis } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type FriendCardProps = {
  friend: User;
};

export default function FriendCard({ friend }: FriendCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/profile/${friend.user_id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white cursor-pointer rounded-[30px] w-full 3xl:max-w-[calc(50%-30px)] max-w-[calc(50%-20px)] 3xl:py-[18px] py-4 3xl:pl-[28px] 3xl:pr-10 pl-5 pr-8 border border-deep-lilac"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row 3xl:gap-5 gap-4 items-center">
          <SquareAvatar size={120} src={friend.avatar_url} />
          <div className="flex flex-col 3xl:gap-3 gap-2">
            <span className="3xl:text-2xl text-xl font-bold">
              {friend.full_name}
            </span>
            <span className="text-spanish-gray">0 mutual friends</span>
          </div>
        </div>
        <div className="text-deep-lilac">
          <FaEllipsis size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
