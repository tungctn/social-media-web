import User from "@/utils/fakeData/User";
import Avatar from "./Avatar";
import Button from "./Button";
import {
  refuseFriendRequest,
  updateFriendState,
} from "@/services/friendServices";
import { FriendStatus } from "@/constants/Others";
import { toast } from "react-toastify";

type FriendRequireCardProps = {
  friend: User;
  onChange: Function;
};

export default function FriendRequireCard({
  friend,
  onChange,
}: FriendRequireCardProps) {
  const handleAccept = async () => {
    const res: any = await updateFriendState({
      receiver_id: friend.user_id,
      friend_status: FriendStatus.accept,
    });

    if (res.success) {
      toast.success("Đã chấp nhận lời mời kết bạn!");
      onChange(friend, FriendStatus.accept);
    }
  };

  const handleReject = async () => {
    const res: any = await refuseFriendRequest({
      receiver_id: friend.user_id,
    });

    if (res.success) {
      toast.success("Đã từ chối lời mời kết bạn!");
      onChange(friend, FriendStatus.refuse);
    }
  };
  return (
    <div className="bg-white flex flex-col justify-between 3xl:py-8 py-6 3xl:px-[46px] px-8 rounded-[20px] shadow-custom 3xl:w-[266px] 3xl:h-[328px] w-[calc(266px/6*5)] h-[calc(328px/6*5)]">
      <div className="flex flex-col gap-1 items-center">
        <Avatar size={126} src={friend.avatar_url} hasBorder={true} />
        <div className="flex flex-col items-center">
          <span className="text-deep-lilac 3xl:text-2xl text-xl">
            {friend.full_name}
          </span>
          <span className="text-spanish-gray text-xs">0 mutual friends</span>
        </div>
      </div>
      <div className="flex flex-col 3xl:gap-3 gap-1">
        <Button
          onClick={handleAccept}
          customClassName="3xl:!h-[31px] !h-[calc(31px/6*5)] 3xl:!text-base !text-sm 3xl:!rounded-[10px] !rounded-[calc(10px/6*5)]"
        >
          Accept
        </Button>
        <Button
          onClick={handleReject}
          customClassName="3xl:!h-[31px] !h-[calc(31px/6*5)] 3xl:!text-base !text-sm 3xl:!rounded-[10px] !rounded-[calc(10px/6*5)]"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
