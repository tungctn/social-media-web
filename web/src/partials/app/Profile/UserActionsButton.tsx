import { currentUser } from "@/utils/fakeData/User";
import { FaEllipsis, FaGear } from "react-icons/fa6";

type UserActionsButtonProps = {
  userId: number;
};

export default function UserActionsButton({ userId }: UserActionsButtonProps) {
  return (
    <div className="text-deep-lilac flex justify-end 3xl:mt-8 mt-6 3xl:mr-[44px] mr-[calc(44px/6*5)] mb-[10px]">
      {currentUser.id === Number(userId) ? (
        <FaGear size={25} />
      ) : (
        <FaEllipsis size={25} />
      )}
    </div>
  );
}