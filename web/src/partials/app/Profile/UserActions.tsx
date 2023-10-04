"use client";

import Button from "@/components/Button";
import FollowingButton from "./FollowingButton";
import { useSelector } from "react-redux";

type UserActionsProps = {
  userId: number;
};

export default function UserActions({ userId }: UserActionsProps) {
  const auth = useSelector((state: any) => state.auth);
  return (
    <div className="flex flex-row 3xl:gap-5 2xl:gap-4">
      {Number(userId) !== auth.user.user_id ? (
        <>
          <FollowingButton />
          <Button customClassName="!h-10 !rounded-[5px] !text-[14px] !font-medium">
            + Add friend
          </Button>
        </>
      ) : (
        <Button customClassName="!h-10 !rounded-[5px] !text-white !text-[14px]">
          Edit account
        </Button>
      )}
    </div>
  );
}
