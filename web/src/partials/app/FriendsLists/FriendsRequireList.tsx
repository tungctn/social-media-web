"use client";

import FriendRequireCard from "@/components/FriendRequireCard";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import User from "@/utils/fakeData/User";
import { useRef, useEffect } from "react";

type FriendsRequireListProps = {
  friendsList: User[];
};

export default function FriendsRequireList({
  friendsList,
}: FriendsRequireListProps) {
  const { width } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      let gap = 40;
      const containerW = ref.current.offsetWidth;
      if (width >= BREAKPOINTS.extraLarge) {
      } else {
        gap = (containerW - (266 / 6) * 5 * 3) / 2 - 0.5;
      }

      ref.current.style.gap = gap + "px";
    }
  }, [width, ref]);

  return (
    <div className="overflow-auto scrollbar-none 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)]">
      <div
        className="3xl:my-11 my-9 flex flex-row flex-wrap 3xl:mx-auto mx-16 3xl:justify-center"
        ref={ref}
      >
        {friendsList?.map((friendItem: User) => {
          return (
            <FriendRequireCard key={friendItem.user_id} friend={friendItem} />
          );
        })}
      </div>
    </div>
  );
}
