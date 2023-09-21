import Link from "next/link";

type LogoProps = {
  inPage?: boolean;
  inAuth?: boolean;
};

export default function Logo({ inPage = true, inAuth }: LogoProps) {
  return (
    <Link
      href={"/"}
      className={`font-bold${
        inPage
          ? " text-7xl text-deep-lilac"
          : inAuth
          ? " text-8xl text-black uppercase"
          : ""
      }`}
    >
      Logo
    </Link>
  );
}
