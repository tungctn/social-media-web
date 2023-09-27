"use client";

import DefaultLayout from "@/layouts/DefaultLayout";
import Image from "next/image";
import PhgImg from "@/assets/imgs/phg-1.png";
import Avatar from "@/components/Avatar";
import { currentUser } from "@/utils/fakeData/User";
import Tabs from "@/components/Tabs";
import PostsList from "@/partials/app/Profile/PostsList";
import { postsByUser } from "@/utils/fakeData/Post";
import TabPanel from "@/components/TabPanel";
import { useMemo, useState } from "react";
import UserActionsButton from "@/partials/app/Profile/UserActionsButton";
import UserActions from "@/partials/app/Profile/UserActions";

const userTabs = [
  {
    id: 1,
    label: "Uploaded Posts",
  },
  {
    id: 2,
    label: "Shared Posts",
  },
  {
    id: 3,
    label: "Saved Posts",
  },
];

const anotherUserTabs = [
  {
    id: 1,
    label: "Uploaded Posts",
  },
  {
    id: 2,
    label: "Shared Posts",
  },
];

export default function Profile({ params }: { params: { id: number } }) {
  const [currentTab, setCurrentTab] = useState(1);
  const tabs = useMemo(() => {
    return currentUser.id === Number(params.id) ? userTabs : anotherUserTabs;
  }, [params.id]);

  const handleChangeTab = (tabId: number) => {
    setCurrentTab(tabId);
  };
  return (
    <DefaultLayout>
      <div className="flex flex-row 3xl:my-10 my-8 bg-cultured rounded-[30px] 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)] 3xl:mr-10 mr-8">
        <div className="3xl:min-w-[462px] 3xl:w-[462px] min-w-[calc(462px/6*5)] w-[calc(462px/6*5)] flex flex-col overflow-auto scrollbar-thin scroll-smooth pb-8">
          <UserActionsButton userId={params.id} />
          <div className="mx-auto">
            <Image src={PhgImg} alt="phg" className="z-10 relative" />
            <div className="-mt-12">
              <Avatar size={202} src={currentUser.avatar} />
            </div>
          </div>
          <span className="text-deep-lilac 3xl:text-2xl text-xl mt-3 text-center">
            {currentUser.username}
          </span>
          <div className="flex flex-row mx-auto w-[277px] justify-between 3xl:mt-[33px] mt-[calc(33px/6*5)]">
            <span>0 Posts</span>
            <span>0 following</span>
            <span>0 Followers</span>
          </div>
          <div className="px-10 3xl:mt-6 mt-3">
            <UserActions userId={params.id} />
            {currentUser.intro && (
              <div className="3xl:mt-[55px] mt-[calc(55px/6*5)]">
                <p>{currentUser.intro}</p>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-[30px] bg-light-silver w-full shadow-[-28px_0px_20px_-20px_rgba(0,0,0,.5)]">
          <div className="3xl:w-[882px] w-[735px] overflow-hidden py-[30px] 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)] mx-auto">
            <Tabs onChange={handleChangeTab} tabItems={tabs} />
            <div>
              {tabs.map((tab) => {
                return (
                  <TabPanel key={tab.id} value={currentTab} id={tab.id}>
                    <PostsList posts={postsByUser} />
                  </TabPanel>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
