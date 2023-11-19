"use client";

import TabPanel from "@/components/TabPanel";
import Tabs from "@/components/Tabs";
import PostsList from "./PostsList";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  getPostsByUserId,
  getSavedPostsOfAuthUser,
} from "@/services/postService";

enum PostTabEnum {
  upload = 1,
  share = 2,
  save = 3,
}

const userTabs = [
  {
    id: PostTabEnum.upload,
    label: "Uploaded Posts",
  },
  {
    id: PostTabEnum.save,
    label: "Saved Posts",
  },
];

const anotherUserTabs = [
  {
    id: PostTabEnum.upload,
    label: "Uploaded Posts",
  },
];

type PostTabsProps = {
  id: number;
};

export default function PostTabs({ id }: PostTabsProps) {
  const auth = useSelector((state: any) => state.auth);
  const [currentTab, setCurrentTab] = useState(PostTabEnum.upload);
  const [postsLists, setPostsLists] = useState<any[]>([]);

  useEffect(() => {
    !postsLists[currentTab - 1] && id && getPostsList();
  }, [currentTab, id]);

  const getPostsList = async () => {
    const newPostsLists = [...postsLists];
    switch (currentTab) {
      case PostTabEnum.upload:
        const uploadedRes = await getPostsByUserId(id);
        newPostsLists[PostTabEnum.upload - 1] = uploadedRes.data.posts;
        break;
      case PostTabEnum.save:
        const savedRes = await getSavedPostsOfAuthUser();
        newPostsLists[PostTabEnum.save - 1] = savedRes.data.posts;
      case PostTabEnum.share:
        const sharedRes = {
          data: {
            posts: []
          }
        }
        newPostsLists[PostTabEnum.share - 1] = sharedRes.data.posts;
      default:
        break;
    }

    setPostsLists(newPostsLists);
  };

  const tabs = useMemo(() => {
    return auth.user.user_id === Number(id)
      ? userTabs.map((userTab) => ({
          ...userTab,
          label:
            userTab.label +
            (postsLists[userTab.id - 1]
              ? `(${postsLists[userTab.id - 1]?.length ?? 0})`
              : ""),
        }))
      : anotherUserTabs.map((userTab) => ({
          ...userTab,
          label: userTab.label + (postsLists[userTab.id - 1]
            ? `(${postsLists[userTab.id - 1]?.length ?? 0})`
            : ""),
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
