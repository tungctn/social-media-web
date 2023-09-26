"use client";

import DefaultLayout from "@/layouts/DefaultLayout";
import Image from "next/image";
import { FaEllipsis } from "react-icons/fa6";
import PhgImg from "@/assets/imgs/phg-1.png";
import Avatar from "@/components/Avatar";
import { currentUser } from "@/utils/fakeData/User";
import FollowingButton from "@/partials/app/Profile/FollowingButton";
import Tabs from "@/components/Tabs";
import PostsList from "@/partials/app/Profile/PostsList";
import { postsByUser } from "@/utils/fakeData/Post";
import TabPanel from "@/components/TabPanel";
import { useState } from "react";

export default function Profile({
  params,
}: {
  params: { id: string | number };
}) {
  const [currentTab, setCurrentTab] = useState(1);
  const handleChangeTab = (tabId: number) => {
    setCurrentTab(tabId);
  };
  return (
    <DefaultLayout>
      <div className="flex flex-row">
        <div className="3xl:min-w-[462px] 3xl:w-[462px] min-w-[calc(462px/6*5)] w-[calc(462px/6*5)] h-screen flex flex-col overflow-auto scrollbar-thin scroll-smooth">
          <div className="text-deep-lilac flex justify-end 3xl:mt-8 mt-6 3xl:mr-[44px] mr-[calc(44px/6*5)] mb-[10px]">
            <FaEllipsis size={25} />
          </div>
          <div className="mx-auto">
            <Image src={PhgImg} alt="phg" className="z-10 relative" />
            <div className="-mt-12">
              <Avatar size={202} src={currentUser.avatar} />
            </div>
          </div>
          <div className="flex flex-row mx-auto w-[277px] justify-between 3xl:mt-[73px] mt-9">
            <span>0 Posts</span>
            <span>0 following</span>
            <span>0 Followers</span>
          </div>
          <div className="px-10 3xl:mt-6 mt-3">
            <FollowingButton />
            {currentUser.intro && (
              <div className="3xl:mt-[55px] mt-[calc(55px/6*5)]">
                <p>{currentUser.intro}</p>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-l-[30px] bg-white w-full">
          <div className="3xl:w-[882px] w-[735px] overflow-hidden py-[30px] h-screen mx-auto">
            <Tabs
              onChange={handleChangeTab}
              tabItems={[
                {
                  id: 1,
                  label: "Uploaded Posts",
                },
                {
                  id: 2,
                  label: "Shared Posts",
                },
              ]}
            />
            <div>
              <TabPanel value={currentTab} id={1}>
                <PostsList posts={postsByUser} />
              </TabPanel>
              <TabPanel value={currentTab} id={2}>
                <PostsList posts={postsByUser} />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
