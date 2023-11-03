import Avatar from "@/components/Avatar";
import { GENDER } from "@/constants/Others";
import { getUserById } from "@/services/userServices";
import User, { users } from "@/utils/fakeData/User";
import dayjs from "dayjs";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import UserInfoImg from "@/assets/imgs/user-info.png";

type UserInfoDetailProps = {
  open?: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
  id: number;
};

export default function UserInfoDetail({ onClose, id }: UserInfoDetailProps) {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    id && getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    const res: any = await getUserById(id);
    if (res.success) {
      setUser({
        ...(res.data.user_info ?? {}),
        email: res.data.email,
        user_id: res.data.user_id,
      });
    }
  };
  return (
    <div className="fixed top-0 left-0 z-20">
      <div
        className="w-screen h-screen bg-black/50 absolute top-0 left-0 z-20"
        onClick={onClose}
      ></div>
      {user && (
        <div className="bg-white 3xl:w-[700px] w-[calc(700px/6*5)] absolute z-30 top-[50vh] -translate-y-1/2 left-[50vw] -translate-x-1/2 3xl:rounded-[30px] rounded-[calc(30px/6*5)] 3xl:p-20 p-[calc(80px/6*5)]">
          <div className="flex flex-row 3xl:gap-[25px] gap-[calc(25px/6*5)]">
            <Avatar size={150} src={user.avatar_url} />
            <div className="text-black flex flex-col 3xl:gap-3 gap-2 justify-center">
              <span className="font-bold 3xl:text-2xl text-[calc(24px/6*5)]">
                {user.full_name}
              </span>
              {typeof user.gender === "number" && (
                <span>Gender: {GENDER[user.gender]}</span>
              )}
              <span>
                Date of birth: {dayjs(user.date_of_birth).format("DD/MM/YYYY")}
              </span>
              {user.address && <span>Address: {user.address}</span>}
            </div>
          </div>
          <div className="relative">
            <div className="3xl:mt-10 mt-[calc(40px/6*5)] 3xl:rounded-[30px] rounded-[calc(30px/6*5)] bg-lavender 3xl:px-10 px-[calc(40px/6*5)] 3xl:py-[45px] py-[calc(45px/6*5)] text-black text-justify">
              {user.bio}
            </div>
            <Image
              src={UserInfoImg}
              alt="user info"
              className="absolute 3xl:w-[86px] w-[calc(86px/6*5)] object-contain bottom-0 -right-[37px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
