"use client";

import User from "@/utils/fakeData/User";
import Avatar from "./Avatar";
import Button from "./Button";
import { useState } from "react";
import { FriendStatus } from "@/constants/Others";
import {
  createFriendRequest,
  refuseFriendRequest,
  updateFriendState,
} from "@/services/friendServices";

type SearchUserCardProps = {
  user: any;
};

const FriendStateLabel: any = {
  [FriendStatus.make]: "Request",
  [FriendStatus.pending]: "Accept",
  [FriendStatus.pending - 1]: "Requested",
  [FriendStatus.accept]: "Friend",
  [FriendStatus.remove]: "Remove",
};

export default function SearchUserCard({ user }: SearchUserCardProps) {
  const [friendStatus, setFriendStatus] = useState(
    user?.friend_status === FriendStatus.pending
      ? user?.friend_status - Number(user?.is_sender)
      : user?.friend_status
      ? Number(user?.friend_status)
      : -1,
  );

  const hanldeFollow = async () => {
    switch (friendStatus) {
      case FriendStatus.pending:
        const acceptRes: any = await updateFriendState({
          receiver_id: user.user_id,
          friend_status: FriendStatus.accept,
        });
        if (acceptRes.success) {
          setFriendStatus(FriendStatus.accept);
        }
        break;
      case FriendStatus.pending - 1:
      case FriendStatus.accept:
        const deleteRes: any = await refuseFriendRequest({
          receiver_id: user.user_id,
        });
        if (deleteRes.success) {
          setFriendStatus(FriendStatus.make);
        }
        break;
      case FriendStatus.make:
        const createRes: any = await createFriendRequest({
          receiver_id: user.user_id,
        });
        if (createRes.success) {
          setFriendStatus(FriendStatus.pending - 1);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-white rounded-[30px] shadow-custom flex flex-row">
      <div className="3xl:pt-[30px] pt-[calc(30px/6*5)] 3xl:pb-[44px] pb-[calc(44px/6*5)] 3xl:px-10 px-[calc(40px/6*5)] flex flex-row 3xl:gap-4 gap-3 w-full">
        <Avatar size={60} />
        <div className="pt-[7px] flex flex-col gap-[7px]">
          <span className="font-bold 3xl:text-xl text-[calc(20px/6*5)] leading-[1]">
            {user.full_name}
          </span>
          <div className="3xl:text-[14px] text-[calc(14px/6*5)] leading-[1] flex flex-col gap-[7px]">
            <span>{user.manual_friends_count ?? 0} manual friends</span>
            <div className="flex flex-row 3xl:gap-5 gap-4">
              {/* <span>{user.posts_count ?? 0} Post</span> */}
              <span>{user.friends_count ?? 0} Friend</span>
              {/* <span>0 Following</span>
              <span>0 Follower</span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center 3xl:mr-[55px] mr-[calc(55px/6*5)]">
        <Button
          customClassName={
            "3xl:!h-10 !h-[calc(40px/6*5)] 3xl:!w-[124px] !w-[calc(124px/6*5)] 3xl:!text-base !text-[calc(1rem/6*5)] 3xl:!rounded-[10px] !rounded-[calc(10px/6*5)] "
          }
          onClick={hanldeFollow}
        >
          {FriendStateLabel[friendStatus]}
        </Button>
      </div>
    </div>
  );
}
