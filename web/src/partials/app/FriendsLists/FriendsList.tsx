"use client";

import FriendCard from "@/components/FriendCard";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import User from "@/utils/fakeData/User";
import { useEffect, useRef, useState } from "react";

type FriendsListProps = {
  friendsList: User[];
  title: string;
  onChange: Function;
};

export default function FriendsList({
  friendsList,
  title,
  onChange,
}: FriendsListProps) {
  const { width } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<any>();

  useEffect(() => {
    friendsList && setList(friendsList);
  }, [friendsList]);

  return (
    <div className="overflow-auto scrollbar-none 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)]">
      {list && (
        <>
          <h1 className="text-deep-lilac 3xl:text-[32px] text-2xl font-bold mt-10 mx-10">
            {title} ({list.length} friends)
          </h1>
          <div className="3xl:my-[35px] my-[calc(35px/6*5)] flex flex-row flex-wrap 3xl:mx-auto mx-8 3xl:justify-center 3xl:gap-x-[60px] gap-x-10 3xl:gap-y-10 xl:gap-y-7">
            {list.map((friendItem: User) => {
              return (
                <FriendCard
                  key={friendItem.user_id}
                  friend={friendItem}
                  onChange={onChange}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
