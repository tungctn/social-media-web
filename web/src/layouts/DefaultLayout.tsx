"use client";
import Logo from "@/components/Logo";
import Menu from "@/partials/layouts/DefaultLayout/Menu";
import { MouseEventHandler, ReactElement, memo, useEffect } from "react";
import { currentUser } from "@/utils/fakeData/User";
import Avatar from "@/components/Avatar";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import UnAuthenticatedError from "@/partials/app/Auth/400Error";
import Loading from "@/components/Loading";

type DefaultLayoutProps = {
  children: ReactElement;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    auth.isLogedIn !== undefined &&
      !auth.isLogedIn &&
      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
  }, [auth.isLogedIn]);

  const handleClickUser: MouseEventHandler<HTMLDivElement> = () => {
    router.push(`/profile/${auth.user.user_id}`);
  };

  return (
    <div className="flex flex-row">
      {auth.isLogedIn && auth.user ? (
        <>
          <header className="3xl:min-w-[367px] min-w-[300px] 3xl:pl-[60px] pl-[40px] bg-white fixed top-0">
            <div className="relative min-h-screen">
              <div className="pt-8">
                <Logo />
              </div>
              <div
                className="flex flex-col items-center mr-[39px] mt-[62px] mb-[40px] gap-[19px] cursor-pointer"
                onClick={handleClickUser}
              >
                <Avatar size={120} src={auth.user.avatar_url} />
                <div className="flex flex-col items-center">
                  <span className="text-xl">{auth.user.full_name}</span>
                  <span className="text-[14px] text-spanish-gray">
                    {auth.user.email}
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
          <main className="3xl:w-[calc(100%-367px)] w-[calc(100%-300px)] 3xl:ml-[367px] ml-[300px]">
            {children}
          </main>
        </>
      ) : auth.isLogedIn !== undefined && !auth.isLogedIn ? (
        <UnAuthenticatedError />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default memo(DefaultLayout);
