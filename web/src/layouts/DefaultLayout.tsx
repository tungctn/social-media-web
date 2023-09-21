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
      <header className="min-w-[257px] bg-white min-h-screen fixed top-0">
        <div className="mt-8 ml-[33px]">
          <Logo />
        </div>
        <Menu />
        <div className="mt-[33px] flex flex-row gap-[10px] items-center cursor-pointer">
          <div className="text-deep-lilac ml-12">
            <Avatar size={23} src={currentUser.avatar} />
          </div>
          <span className="text-xl">{currentUser.username}</span>
        </div>
      </header>
      <main className="w-[calc(100%-257px)] ml-[257px]">{children}</main>
    </div>
  );
}
