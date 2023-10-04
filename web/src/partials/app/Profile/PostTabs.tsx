"use client";

import TabPanel from "@/components/TabPanel";
import Tabs from "@/components/Tabs";
import PostsList from "./PostsList";
import { useMemo, useState } from "react";
import { currentUser } from "@/utils/fakeData/User";
import { postsByUser } from "@/utils/fakeData/Post";
import { useSelector } from "react-redux";

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

type PostTabsProps = {
  id: number;
};

export default function PostTabs({ id }: PostTabsProps) {
  const auth = useSelector((state: any) => state.auth);
  const [currentTab, setCurrentTab] = useState(1);
  const postsLists = useMemo(() => {
    return auth.user.user_id === Number(id)
      ? [postsByUser, postsByUser, postsByUser]
      : [postsByUser, postsByUser];
  }, [id]);

  const tabs = useMemo(() => {
    return auth.user.user_id === Number(id)
      ? userTabs.map((userTab) => ({
          ...userTab,
          label: userTab.label + `(${postsLists[userTab.id - 1].length})`,
        }))
      : anotherUserTabs.map((userTab) => ({
          ...userTab,
          label: userTab.label + `(${postsLists[userTab.id - 1].length})`,
        }));
  }, [postsLists]);

  const handleChangeTab = (tabId: number) => {
    setCurrentTab(tabId);
  };
  return (
    <>
      <Tabs onChange={handleChangeTab} tabItems={tabs} />
      <div>
        {tabs.map((tab) => {
          return (
            <TabPanel key={tab.id} value={currentTab} id={tab.id}>
              <PostsList posts={postsLists[tab.id - 1]} />
            </TabPanel>
          );
        })}
      </div>
    </>
  );
}
