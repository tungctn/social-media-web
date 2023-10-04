"use client";

import { FaEllipsis, FaGear } from "react-icons/fa6";
import { useSelector } from "react-redux";

type UserActionsButtonProps = {
  userId: number;
};

export default function UserActionsButton({ userId }: UserActionsButtonProps) {
  const auth = useSelector((state: any) => state.auth);
  return (
    <div className="text-deep-lilac flex justify-end 3xl:mt-8 mt-6 3xl:mr-[44px] mr-[calc(44px/6*5)] mb-[10px]">
      {auth.user.user_id === Number(userId) ? (
        <FaGear size={25} />
      ) : (
        <FaEllipsis size={25} />
      )}
    </div>
  );
}
