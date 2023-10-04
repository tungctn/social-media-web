"use client";

import FriendCard from "@/components/FriendCard";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import User from "@/utils/fakeData/User";
import { useEffect, useRef } from "react";

type FriendsListProps = {
  friendsList: User[];
};

export default function FriendsList({ friendsList }: FriendsListProps) {
  const { width } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-auto scrollbar-none 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)]">
      <div className="3xl:my-11 my-9 flex flex-row flex-wrap 3xl:mx-auto mx-8 3xl:justify-center 3xl:gap-x-[60px] gap-x-10 3xl:gap-y-10 xl:gap-y-7">
        {friendsList?.map((friendItem: User) => {
          return <FriendCard key={friendItem.user_id} friend={friendItem} />;
        })}
      </div>
    </div>
  );
}
