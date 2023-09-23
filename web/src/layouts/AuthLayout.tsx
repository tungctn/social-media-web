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
      <div className="py-[30px]">
        <div className="rounded-[30px] px-[40px] z-10 relative bg-white/50 w-[880px]">
          <div className="flex flex-row">
            <div className="w-fit flex flex-col justify-between items-center">
              <div className="mt-[49px]">
                <Logo inPage={false} inAuth={true} />
              </div>
              <Image
                src={img}
                alt="female-cat"
                className="min-w-[307px] h-auto float-bottom object-contain translate-x-[calc(-40px-76px)]"
              />
            </div>
            <div className="w-full py-[71px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
