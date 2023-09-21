import Image from "next/image";
import WelcomBoxImg from "@/assets/imgs/welcom-box.png";
import SmallCatImg from "@/assets/imgs/small-cat-1.png";
import { courgette } from "@/constants/Fonts";

export default function WelcomBox() {
  return (
    <div className="h-[237px] relative w-full px-[86px]">
      <Image
        src={WelcomBoxImg}
        alt="welcom-box"
        className="h-full w-full rounded-[30px] absolute top-0 left-0 object-cover shadow-custom"
      />
      <div className="z-10 absolute top-0 text-white flex flex-col gap-3 my-auto mt-12">
        <span className="text-[56px] font-black">Hello user&apos;s name</span>
        <span className={`text-[32px] ${courgette.className}`}>
          Welcom back! Have a good time!
        </span>
      </div>
      <Image
        src={SmallCatImg}
        alt="welcom-cat"
        className="z-10 absolute bottom-[-4px] right-[-14px]"
      />
    </div>
  );
}
