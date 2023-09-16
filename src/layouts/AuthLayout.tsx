import { ReactNode } from "react";
import backgroundImg from "@/assets/imgs/background.png";
import Image, { StaticImageData } from "next/image";

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
        <div className="rounded-[30px] py-[71px] px-[76px] z-10 relative bg-white/50 w-[1124px]">
          <div className="flex flex-row gap-[106px]">
            <div className="w-fit flex items-end">
              <Image
                src={img}
                alt="female-cat"
                className="min-w-[329px] h-auto float-bottom object-contain"
              />
            </div>
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
