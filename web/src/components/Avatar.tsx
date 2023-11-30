"use client";

import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

type AvatarProps = {
  size?: number;
  src?: string;
  hasBorder?: boolean;
};

export default function Avatar({
  size = 16,
  src,
  hasBorder = false,
}: AvatarProps) {
  const { width } = useWindowDimensions();
  const [currenSize, setCurrentSize] = useState(size);

  useEffect(() => {
    if (width >= BREAKPOINTS.xl3) {
    } else {
      setCurrentSize((size / 6) * 5);
    }
  }, [width, size]);
  return (
    <div className="text-deep-lilac">
      {src ? (
        <Image
          src={src}
          alt="avatar"
          width={size}
          height={size}
          className={`rounded-full object-cover ${
            hasBorder && "border border-deep-lilac"
          }`}
          style={{
            width: currenSize,
            height: currenSize,
          }}
        />
      ) : (
        <FaUserCircle size={currenSize} />
      )}
    </div>
  );
}
