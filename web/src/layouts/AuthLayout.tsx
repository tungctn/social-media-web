import { ReactNode } from "react";
import backgroundImg from "@/assets/imgs/background.png";
import Image, { StaticImageData } from "next/image";
import Logo from "@/components/Logo";

type AuthLayoutProps = {
  children: ReactNode;
  img: StaticImageData;
};

export default function AuthLayout({ children, img }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        src={backgroundImg}
        alt="background"
        className="w-screen h-screen object-cover top-0 fixed"
      />
      <div className="3xl:py-[30px] 2xl:py-[25px]">
        <div className="rounded-[30px] 3xl:px-[40px] 2xl:px-[calc(40px/6*5)] z-10 relative bg-white/50 3xl:w-[880px] 2xl:w-[calc(880px/6*5)]">
          <div className="flex flex-row 3xl:gap-10 2xl:gap-8">
            <div className="w-fit flex flex-col justify-between items-center">
              <div className="3xl:mt-[49px] 2xl:mt-[30px]">
                <Logo inPage={false} inAuth={true} />
              </div>
              <Image
                src={img}
                alt="female-cat"
                className="3xl:min-w-[307px] 2xl:min-w-[calc(307px/6*5)] h-auto float-bottom object-contain 3xl:translate-x-[calc(-40px-76px)] 2xl:translate-x-[calc(-40px/6*5-76px/6*5)]"
              />
            </div>
            <div className="w-full 3xl:py-[71px] 2xl:py-14">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
