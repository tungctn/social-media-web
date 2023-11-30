"use client";

import { ReactNode, memo, useEffect } from "react";
import backgroundImg from "@/assets/imgs/background.png";
import Image, { StaticImageData } from "next/image";
import Logo from "@/components/Logo";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type AuthLayoutProps = {
  children: ReactNode;
  img: StaticImageData;
};

function AuthLayout({ children, img }: AuthLayoutProps) {
  const auth = useSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.isLogedIn) {
      if (auth.user) {
        toast.info("You loged in!");
      }
      router.push("/");
    }
  }, [auth.isLogedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        src={backgroundImg}
        alt="background"
        className="w-screen h-screen object-cover top-0 fixed"
      />
      <div className="3xl:py-[30px] py-[25px]">
        <div className="rounded-[30px] 3xl:px-[40px] px-[calc(40px/6*5)] z-10 relative bg-white/50 3xl:w-[880px] w-[calc(880px/6*5)]">
          <div className="flex flex-row 3xl:gap-10 gap-8">
            <div className="w-fit flex flex-col justify-between items-center">
              <div className="3xl:mt-[49px] mt-[30px]">
                <Logo inPage={false} inAuth={true} />
              </div>
              <Image
                src={img}
                alt="female-cat"
                className="3xl:min-w-[280px] min-w-[calc(280px/6*5)] h-auto float-bottom object-contain 3xl:translate-x-[calc(-40px-76px)] translate-x-[calc(-40px/6*5-76px/6*5)]"
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AuthLayout);
