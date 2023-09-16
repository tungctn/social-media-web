import googleIcon from "@/assets/icons/google.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import Image from "next/image";

type IconProps = {
  name: "google" | "facebook";
};

const names = {
  google: googleIcon,
  facebook: facebookIcon,
};

export default function Icon({ name }: IconProps) {
  return (
    <span>
      <Image src={names[name]} alt={name} />
    </span>
  );
}
