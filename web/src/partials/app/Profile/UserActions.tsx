"use client";

import Button from "@/components/Button";
import FollowingButton from "./FollowingButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createFriendRequest } from "@/services/friendServices";
import { useState } from "react";
import { CustomFlowbiteTheme, Tooltip } from "flowbite-react";

type UserActionsProps = {
  userId: number;
};

enum FriendState {
  NotFriendYet = 0,
  IsFriend = 1,
  Requested = 2,
}

const friendStateLabel = {
  0: "+ Add friend",
  1: "Friend",
  2: "Cancel request",
};

export default function UserActions({ userId }: UserActionsProps) {
  const auth = useSelector((state: any) => state.auth);
  const [friendState, setFriendState] = useState(FriendState.NotFriendYet);
  const route = useRouter();

  const handleEditProfile = () => {
    route.push(`/profile/${auth.user.user_id}/edit`);
  };

  const handleAddFriend = async () => {
    // const res = await createFriendRequest({
    //   receiver_id: userId,
    // });
    // console.log(res);
    switch (friendState) {
      case FriendState.NotFriendYet:
        setFriendState(FriendState.Requested);
        break;
      case FriendState.IsFriend:
        setFriendState(FriendState.NotFriendYet);
        break;
      case FriendState.Requested:
        setFriendState(FriendState.NotFriendYet);
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex flex-row 3xl:gap-5 2xl:gap-4">
      {Number(userId) !== auth.user.user_id ? (
        <>
          <FollowingButton />
          <div className="w-full">
            <Tooltip
              content={friendState === FriendState.IsFriend && "Hủy kết bạn"}
              theme={customTooltipTheme}
              style="light"
              className={friendState === FriendState.IsFriend ? "" : "hidden"}
            >
              <Button
                customClassName="!h-10 !rounded-[5px] !text-[14px] !font-medium"
                onClick={handleAddFriend}
              >
                {friendStateLabel[friendState]}
              </Button>
            </Tooltip>
          </div>
        </>
      ) : (
        <Button
          customClassName="!h-10 !rounded-[5px] !text-white !text-[14px]"
          onClick={handleEditProfile}
        >
          Edit account
        </Button>
      )}
    </div>
  );
}

const customTooltipTheme: CustomFlowbiteTheme["tooltip"] = {
  target: "w-full",
};
