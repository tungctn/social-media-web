"use client";

import OptionsBox from "@/components/OptionsBox";
import useComponentVisible from "@/hooks/useComponentVisible";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { FaEllipsis, FaGear } from "react-icons/fa6";
import { useSelector } from "react-redux";

type UserActionsButtonProps = {
  userId: number;
};

export default function UserActionsButton({ userId }: UserActionsButtonProps) {
  const auth = useSelector((state: any) => state.auth);
  const {
    ref: actionsRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const router = useRouter();

  const handleClickClose: any = () => {
    setIsComponentVisible(false);
  };

  const handleClickButton: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleEditPassword = () => {
    router.push(`/profile/${auth.user.user_id}/edit-password`);
  };
  return (
    <div className="text-deep-lilac z-10 flex justify-end 3xl:mt-8 mt-6 3xl:mr-[44px] mr-[calc(44px/6*5)] mb-[10px] relative">
      {auth.user.user_id === Number(userId) ? (
        <FaGear size={25} onClick={handleClickButton} />
      ) : (
        <FaEllipsis size={25} onClick={handleClickButton} />
      )}

      {auth.user.user_id === Number(userId) ? (
        <OptionsBox
          actionsRef={actionsRef}
          open={isComponentVisible}
          onClose={handleClickClose}
          options={[
            {
              label: "Edit password",
              onClick: handleEditPassword,
            },
            {
              label: "Delete account",
              danger: true,
            },
          ]}
          topClassName="top-[28px]"
        />
      ) : (
        <OptionsBox
          actionsRef={actionsRef}
          open={isComponentVisible}
          onClose={handleClickClose}
          options={[
            {
              label: "Introduce user",
            },
            {
              label: "Report",
              danger: true,
            },
          ]}
          topClassName="top-[28px]"
        />
      )}
    </div>
  );
}
