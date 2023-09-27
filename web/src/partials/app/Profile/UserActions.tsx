import Button from "@/components/Button";
import FollowingButton from "./FollowingButton";
import { currentUser } from "@/utils/fakeData/User";

type UserActionsProps = {
  userId: number;
};

export default function UserActions({ userId }: UserActionsProps) {
  return (
    <div className="flex flex-row 3xl:gap-5 2xl:gap-4">
      {Number(userId) !== currentUser.id ? (
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
