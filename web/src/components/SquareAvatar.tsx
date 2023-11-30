"use client";

import Image from "next/image";
import { TiUser } from "react-icons/ti";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { BREAKPOINTS } from "@/constants/WindowSizes";

type SquareAvatarProps = {
  size: number;
  src?: string;
  hasBorder?: boolean;
};

export default function SquareAvatar({ src, size = 120 }: SquareAvatarProps) {
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
          alt="avt"
          width={120}
          height={120}
          className={`3xl:rounded-[30px] rounded-[calc(30px/6*5)] object-cover`}
          style={{
            width: currenSize,
            height: currenSize,
          }}
        />
      ) : (
        <TiUser size={currenSize} />
      )}
    </div>
  );
}
