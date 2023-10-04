"use client";

import Container from "@/components/Container";
import { FriendMenu } from "@/constants/DefaultMenu";
import DefaultLayout from "@/layouts/DefaultLayout";
import { friends } from "@/utils/fakeData/User";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export default function Friends() {
  const [currentTabId, setCurrentTabId] = useState(0);
  const [friendsLists, setFriendsLists] = useState(
    new Array(FriendMenu.length),
  );
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    !friendsLists[currentTabId] && getFriendsListsData();
  }, [currentTabId]);

  const getFriendsListsData = () => {
    const newFriendsLists = [...friendsLists];
    newFriendsLists[currentTabId] = friends;
    setFriendsLists(newFriendsLists);
  };

  const handleClickTab = (tabId: number) => {
    setCurrentTabId(tabId);
  };

  const renderList = useCallback(() => {
    const Component = FriendMenu[currentTabId].Component;
    return <Component friendsList={friendsLists[currentTabId]} />;
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
