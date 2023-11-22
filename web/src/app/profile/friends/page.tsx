"use client";

import Container from "@/components/Container";
import { FriendMenu, FriendMenuEnum } from "@/constants/DefaultMenu";
import { FriendStatus } from "@/constants/Others";
import DefaultLayout from "@/layouts/DefaultLayout";
import {
  getAuthFriendsList,
  getFriendRequests,
} from "@/services/friendServices";
import User from "@/utils/fakeData/User";
import { useState, useEffect, useCallback } from "react";

export default function Friends() {
  const [currentTabId, setCurrentTabId] = useState(0);
  const [friendsLists, setFriendsLists] = useState(
    new Array(FriendMenu.length),
  );

  useEffect(() => {
    !friendsLists[currentTabId] && getFriendsListsData();
  }, [currentTabId]);

  const getFriendsListsData = async () => {
    const newFriendsLists = [...friendsLists];
    switch (currentTabId) {
      case FriendMenuEnum.Require:
        const requestRes = await getFriendRequests();
        newFriendsLists[currentTabId] = requestRes.data.friends;
        break;
      case FriendMenuEnum.Friend:
        const friendRes = await getAuthFriendsList();
        newFriendsLists[currentTabId] = friendRes.data.friends;
        break;
      default:
        break;
    }
    setFriendsLists(newFriendsLists);
  };

  const handleClickTab = (tabId: number) => {
    setCurrentTabId(tabId);
  };

  const handleChangeList = (friend: User, status: FriendStatus) => {
    const newLists = [...friendsLists];

    switch (status) {
      case FriendStatus.accept:
        newLists[FriendMenuEnum.Require] = newLists[
          FriendMenuEnum.Require
        ].filter((item: any) => item.user_id !== friend.user_id);
        newLists[FriendMenuEnum.Friend] = [
          ...(newLists[FriendMenuEnum.Friend] ?? []),
          friend,
        ];
        break;
      case FriendStatus.refuse:
        newLists[FriendMenuEnum.Require] = newLists[
          FriendMenuEnum.Require
        ].filter((item: any) => item.user_id !== friend.user_id);
        break;
      case FriendStatus.remove:
        newLists[FriendMenuEnum.Friend] = newLists[
          FriendMenuEnum.Friend
        ].filter((item: any) => item.user_id !== friend.user_id);
        break;
      default:
        break;
    }
    setFriendsLists(newLists);
  };

  const renderList = useCallback(() => {
    const Component = FriendMenu[currentTabId].Component;
    return (
      <Component
        friendsList={friendsLists[currentTabId]}
        title={FriendMenu[currentTabId]?.title}
        onChange={handleChangeList}
      />
    );
  }, [currentTabId, friendsLists]);

  return (
    <DefaultLayout>
      <Container
        sidebarChildren={
          <div className="my-10 mx-10">
            <span className="font-bold 3xl:text-[32px] text-2xl text-deep-lilac">
              Friends List
            </span>
            <div className="3xl:mt-[90px] mt-12 flex flex-col items-start 3xl:gap-[60px] gap-8">
              {FriendMenu.map((friendMenuItem: any) => {
                return (
                  <button
                    type="button"
                    key={friendMenuItem.id}
                    className={`3xl:text-2xl text-lg transition-all duration-300 hover:opacity-80 ${
                      currentTabId === friendMenuItem.id && "text-deep-lilac"
                    }`}
                    onClick={() => handleClickTab(friendMenuItem.id)}
                  >
                    {friendMenuItem.label}
                  </button>
                );
              })}
            </div>
          </div>
        }
        contentChildren={renderList()}
      />
    </DefaultLayout>
  );
}
