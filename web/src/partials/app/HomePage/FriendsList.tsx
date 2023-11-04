"use client";

import BoxHeader from "@/components/BoxHeader";
import User, { friends } from "@/utils/fakeData/User";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthFriendsList } from "@/services/friendServices";
import Button from "@/components/Button";

export default function FriendsList() {
  const router = useRouter();
  const [friends, setFriends] = useState<undefined | User[]>();

  useEffect(() => {
    getFriendsData();
  }, []);

  const getFriendsData = async () => {
    const res = await getAuthFriendsList();
    setFriends(res.data.friends);
  };

  const handleClickUser = (userId: number | string) => {
    router.push(`/profile/${userId}`);
  };

  const handleSeeFriendsList = () => {
    router.push("/profile/friends");
  };

  const handleSearchFriend = () => {
    router.push("/search");
  }

  return (
    <div className="w-full py-[30px] px-[30px] bg-white rounded-[30px]">
      <BoxHeader title="Friend List" onMore={handleSeeFriendsList} />
      <div className="flex flex-col gap-6 mt-9">
        {friends && friends.length > 0 ? (
          <>
            {friends.slice(0, 5).map((user) => {
              return (
                <div
                  key={user.user_id}
                  className="flex flex-row gap-5 items-center cursor-pointer"
                  onClick={() => handleClickUser(user.user_id)}
                >
                  <Avatar size={40} src={user.avatar_url} />
                  <span className="text-xl">{user.full_name}</span>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <span>Chưa có bạn nào</span>
            <Button onClick={handleSearchFriend}>Tìm kiếm</Button>
          </>
        )}
      </div>
    </div>
  );
}
