"use client";

import Image from "next/image";
import WelcomBoxImg from "@/assets/imgs/welcom-box.png";
import WelcomAdminImg from "@/assets/imgs/welcom-admin.png";
import SmallCatImg from "@/assets/imgs/small-cat-1.png";
import { courgette } from "@/constants/Fonts";
import { useSelector } from "react-redux";
import { Role } from "@/utils/fakeData/User";

export default function WelcomBox() {
  const auth = useSelector((state: any) => state.auth);
  return (
    <div className="h-[237px] relative w-full 3xl:px-[86px] px-[calc(86px*0.75)]">
      <Image
        src={WelcomBoxImg}
        alt="welcom-box"
        className="h-full w-full rounded-[30px] absolute top-0 left-0 object-cover shadow-custom"
      />
      <div className="z-10 absolute top-0 text-white flex flex-col gap-3 my-auto mt-12">
        <span className="font-black text-[52px]">
          Hello{" "}
          <span>
            {auth.user.role === Role.Admin ? "Admin !" : auth.user.first_name}
          </span>
        </span>
        <span className={`${courgette.className} text-3xl`}>
          Welcom back!{" "}
          {auth.user.role === Role.Admin
            ? "Be productive!"
            : "Have a good time!"}
        </span>
      </div>
      <Image
        src={auth.user.role === Role.Admin ? WelcomAdminImg : SmallCatImg}
        alt="welcom-cat"
        className={auth.user.role === Role.Admin ? "z-10 absolute right-0 -bottom-[10px] w-[259px] h-[241px]" : "z-10 absolute bottom-[-4px] right-[-14px]"}
      />
    </div>
  );
}
