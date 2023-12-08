import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/imgs/logo.png";

type LogoProps = {
  inPage?: boolean;
  inAuth?: boolean;
};

export default function Logo({ inPage = true, inAuth }: LogoProps) {
  return (
    <Link
      href={"/"}
      className={`font-black ${
        inPage
          ? " text-7xl text-deep-lilac"
          : inAuth
          ? " 3xl:text-[80px] text-[calc(80px/6*5)] text-black uppercase"
          : ""
      }`}
    >
      <Image src={logo} alt="logo" width={150} height={150} className="" />
    </Link>
  );
}
