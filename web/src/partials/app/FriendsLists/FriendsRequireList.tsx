"use client";

import FriendRequireCard from "@/components/FriendRequireCard";
import { FriendStatus } from "@/constants/Others";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import User from "@/utils/fakeData/User";
import { useRef, useEffect, useState } from "react";

type FriendsRequireListProps = {
  friendsList: User[];
  onChange: Function;
};

export default function FriendsRequireList({
  friendsList,
  onChange
}: FriendsRequireListProps) {
  const { width } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    friendsList && setList(friendsList);
  }, [friendsList]);

  useEffect(() => {
    if (ref.current) {
      let gap = 40;
      const containerW = ref.current.offsetWidth;
      if (width >= BREAKPOINTS.xl3) {
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
        {list?.length > 0 ? (
          list.map((friendItem: User) => {
            return (
              <FriendRequireCard
                key={friendItem.user_id}
                friend={friendItem}
                onChange={onChange}
              />
            );
          })
        ) : (
          <span>Không có lời mời kết bạn nào</span>
        )}
      </div>
    </div>
  );
}
