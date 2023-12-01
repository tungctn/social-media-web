"use client";

import User from "@/utils/fakeData/User";
import SquareAvatar from "./SquareAvatar";
import { FaEllipsis } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import OptionsBox from "./OptionsBox";
import useComponentVisible from "@/hooks/useComponentVisible";
import { refuseFriendRequest } from "@/services/friendServices";
import DeleteAlert from "./DeleteAlert";
import { useState } from "react";
import { toast } from "react-toastify";
import { FriendStatus } from "@/constants/Others";

type FriendCardProps = {
  friend: User;
  onChange: Function;
};

export default function FriendCard({ friend, onChange = () => {} }: FriendCardProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const handleClick = () => {
    router.push(`/profile/${friend.user_id}`);
  };

  const handleRemoveFriend = () => {
    setShowDelete(true);
  };

  const handleRemove = async () => {
    const res: any = await refuseFriendRequest({
      receiver_id: friend.user_id,
    });
    if (res.success) {
      onChange(friend, FriendStatus.remove);
      toast.success("Removed friends");
    } else {
      toast.error(res.message);
    }
    setShowDelete(false);
  };
  return (
    <>
      <div className="bg-white cursor-pointer rounded-[30px] w-full 3xl:max-w-[calc(50%-30px)] max-w-[calc(50%-20px)] 3xl:py-[18px] py-4 3xl:pl-[28px] 3xl:pr-10 pl-5 pr-8 border border-deep-lilac">
        <div className="flex flex-row justify-between">
          <div
            onClick={handleClick}
            className="flex flex-row 3xl:gap-5 gap-4 items-center"
          >
            <SquareAvatar size={120} src={friend.avatar_url} />
            <div className="flex flex-col 3xl:gap-3 gap-2">
              <span className="3xl:text-2xl text-xl font-bold">
                {friend.full_name}
              </span>
              <span className="text-spanish-gray">{friend.manual_friends_count ?? 0} manual friends</span>
            </div>
          </div>
          <div className="relative">
            <div
              className="text-deep-lilac"
              onClick={() => setIsComponentVisible(true)}
            >
              <FaEllipsis size={25} className="cursor-pointer" />
            </div>
            <OptionsBox
              actionsRef={ref}
              open={isComponentVisible}
              onClose={() => setIsComponentVisible(false)}
              options={[
                {
                  label: "Remove friend",
                  onClick: handleRemoveFriend,
                },
              ]}
              topClassName="!top-0"
            />
          </div>
        </div>
      </div>
      <DeleteAlert
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onOk={handleRemove}
        item="friend"
      />
    </>
  );
}
