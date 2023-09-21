import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

type AvatarProps = {
  size: number;
  src?: string;
};

export default function Avatar({ size = 16, src }: AvatarProps) {
  return (
    <div className="text-deep-lilac">
      {src ? (
        <Image
          src={src}
          alt="avatar"
          width={size}
          height={size}
          objectFit="cover"
          className="rounded-full w-10 h-10 object-cover"
        />
      ) : (
        <FaUserCircle size={size} />
      )}
    </div>
  );
}
