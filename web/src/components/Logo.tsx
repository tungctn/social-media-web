import Link from "next/link";

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
          ? " text-[80px] text-black uppercase"
          : ""
      }`}
    >
      Logo
    </Link>
  );
}
