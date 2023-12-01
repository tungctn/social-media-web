"use client";

import Button from "@/components/Button";
import FollowingButton from "./FollowingButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  createFriendRequest,
  refuseFriendRequest,
  updateFriendState,
} from "@/services/friendServices";
import { useEffect, useState } from "react";
import { CustomFlowbiteTheme, Tooltip } from "flowbite-react";
import useComponentVisible from "@/hooks/useComponentVisible";
import { FriendStatus } from "@/constants/Others";

type UserActionsProps = {
  userId: number;
  friend: any;
};

enum FriendState {
  NotFriendYet = 0,
  IsWaiting = 1,
  Requested = 2,
  IsFriend = 4,
  Accept = 5,
  Refuse = 6,
}

const friendStateLabel = {
  [FriendState.NotFriendYet]: "+ Add friend",
  [FriendState.IsFriend]: "Friend",
  [FriendState.Requested]: "Cancel request",
  [FriendState.IsWaiting]: "Response",
  [FriendState.Accept]: "Accept",
  [FriendState.Refuse]: "Refuse",
};

export default function UserActions({ userId, friend }: UserActionsProps) {
  const auth = useSelector((state: any) => state.auth);
  const [friendState, setFriendState] = useState(FriendState.NotFriendYet);
  
  const {
    ref: responsesRef,
    isComponentVisible: isShowResponses,
    setIsComponentVisible: setShowResponses,
  } = useComponentVisible(false);
  const route = useRouter();

  useEffect(() => {
    friend &&
      setFriendState(friend.friend_status === 2 ? FriendState.IsFriend : Number(friend.friend_status) + Number(friend.is_sender));
  }, [friend]);

  const handleEditProfile = () => {
    route.push(`/profile/${auth.user.user_id}/edit`);
  };

  const handleAddFriend = async () => {
    const data = {
      receiver_id: userId,
    };
    switch (friendState) {
      case FriendState.NotFriendYet:
        const reqRes: any = await createFriendRequest(data);
        if (reqRes.success) {
          setFriendState(FriendState.Requested);
        }
        break;
      case FriendState.IsWaiting:
        setShowResponses(true);
        break;
      default:
        const deleteRes: any = await refuseFriendRequest(data);
        if (deleteRes.success) {
          setFriendState(FriendState.NotFriendYet);
        }
        break;
    }
  };

  const handleCloseResponses = async (fS: FriendState) => {
    const data: any = {
      receiver_id: userId,
    };
    switch (fS) {
      case FriendState.Accept:
        data.friend_status = FriendStatus.accept;
        const reqRes: any = await updateFriendState(data);
        if (reqRes.success) {
          setFriendState(FriendState.IsFriend);
        }
        break;

      default:
        const deleteRes: any = await refuseFriendRequest(data);
        if (deleteRes.success) {
          setFriendState(FriendState.NotFriendYet);
        }
        break;
    }
    setShowResponses(false);
  };
  return (
    <div className="flex flex-row 3xl:gap-5 2xl:gap-4">
      {Number(userId) !== auth.user.user_id ? (
        <>
          {/* <FollowingButton /> */}
          <div className="w-full">
            <Tooltip
              content={friendState === FriendState.IsFriend && "Hủy kết bạn"}
              theme={customTooltipTheme}
              style="light"
              className={friendState === FriendState.IsFriend ? "" : "hidden"}
            >
              <div className="relative">
                <Button
                  customClassName="!h-10 !rounded-[5px] !text-[14px] !font-medium"
                  onClick={handleAddFriend}
                >
                  {friendStateLabel[friendState]}
                </Button>
                <div
                  ref={responsesRef}
                  className={`bg-white rounded-md 3xl:text-base text-xs px-4 py-2 absolute w-full ${
                    isShowResponses ? "" : "hidden"
                  }`}
                >
                  <button
                    title={friendStateLabel[FriendState.Accept]}
                    key={"accept"}
                    type="button"
                    className={`block py-1 border-lavender border-b-[1px] last:border-b-0 border-solid w-full text-left transition hover:opacity-80`}
                    onClick={() => handleCloseResponses(FriendState.Accept)}
                  >
                    {friendStateLabel[FriendState.Accept]}
                  </button>
                  <button
                    title={friendStateLabel[FriendState.Refuse]}
                    key={"refuse"}
                    type="button"
                    className={`block py-1 border-lavender border-b-[1px] last:border-b-0 border-solid w-full text-left transition hover:opacity-80`}
                    onClick={() => handleCloseResponses(FriendState.Refuse)}
                  >
                    {friendStateLabel[FriendState.Refuse]}
                  </button>
                </div>
              </div>
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
