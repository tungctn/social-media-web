import { FaUserCircle } from "react-icons/fa";
import Logo from "@/components/Logo";
import Menu from "@/partials/layouts/DefaultLayout/Menu";
import { ReactElement } from "react";
import { currentUser } from "@/utils/fakeData/User";
import Avatar from "@/components/Avatar";

type DefaultLayoutProps = {
  children: ReactElement;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-row">
      <header className="min-w-[300px] pl-[40px] bg-white min-h-screen fixed top-0">
        <div className="mt-8">
          <Logo />
        </div>
        <div className="flex flex-col items-center mr-[39px] mt-[62px] mb-[40px] gap-[19px]">
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
      </header>
      <main className="w-[calc(100%-300px)] ml-[300px]">{children}</main>
    </div>
  );
}
