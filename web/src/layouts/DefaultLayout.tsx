"use client";
import Logo from "@/components/Logo";
import Menu from "@/partials/layouts/DefaultLayout/Menu";
import { MouseEventHandler, ReactElement } from "react";
import { currentUser } from "@/utils/fakeData/User";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";

type DefaultLayoutProps = {
  children: ReactElement;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const router = useRouter();

  const handleClickUser: MouseEventHandler<HTMLDivElement> = () => {
    console.log("profile");

    router.push(`/profile/${currentUser.id}`);
  };

  return (
    <div className="flex flex-row">
      <header className="3xl:min-w-[367px] min-w-[300px] 3xl:pl-[60px] pl-[40px] bg-white fixed top-0">
        <div className="relative min-h-screen">
          <div className="pt-8">
            <Logo />
          </div>
          <div
            className="flex flex-col items-center mr-[39px] mt-[62px] mb-[40px] gap-[19px] cursor-pointer"
            onClick={handleClickUser}
          >
            <Avatar size={120} src={currentUser.avatar} />
            <div className="flex flex-col items-center">
              <span className="text-xl">{currentUser.username}</span>
              <span className="text-[14px] text-spanish-gray">
                {currentUser.email}
              </span>
            </div>
            <div className="flex flex-row justify-between text-[14px] w-full">
              <div>0 Posts</div>
              <div>0 following</div>
              <div>0 Follower</div>
            </div>
          </div>
          <Menu />
        </div>
      </header>
      <main className="3xl:w-[calc(100%-367px)] w-[calc(100%-300px)] 3xl:ml-[367px] ml-[300px] rounded-l-[30px] bg-cultured">
        {children}
      </main>
    </div>
  );
}
