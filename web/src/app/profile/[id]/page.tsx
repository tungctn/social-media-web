"use client";

import DefaultLayout from "@/layouts/DefaultLayout";
import Avatar from "@/components/Avatar";
import { users } from "@/utils/fakeData/User";
import UserActionsButton from "@/partials/app/Profile/UserActionsButton";
import UserActions from "@/partials/app/Profile/UserActions";
import PostTabs from "@/partials/app/Profile/PostTabs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Container from "@/components/Container";

export default function Profile({ params }: { params: { id: number } }) {
  const auth = useSelector((state: any) => state.auth);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    auth.isLogedIn && getUserInfo();
  }, [params.id, auth.isLogedIn]);

  const getUserInfo = async () => {
    if (Number(params.id) === auth.user.user_id) {
      setUser(auth.user);
    } else {
      setUser(users[params.id - 1]);
    }
  };

  return (
    <DefaultLayout>
      {user ? (
        <Container
          sidebarChildren={
            <>
              <UserActionsButton userId={params.id} />
              <div className="mx-auto">
                <div>
                  <Avatar size={202} src={user.avatar_url} />
                </div>
              </div>
              <span className="text-deep-lilac 3xl:text-2xl text-xl mt-3 text-center">
                {user.full_name}
              </span>
              <div className="flex flex-row mx-auto w-[277px] justify-between 3xl:mt-[33px] mt-[calc(33px/6*5)]">
                <span>0 Posts</span>
                <span>0 following</span>
                <span>0 Followers</span>
              </div>
              <div className="px-10 3xl:mt-6 mt-3">
                <UserActions userId={params.id} />
                {user.bio && (
                  <div className="3xl:mt-[55px] mt-[calc(55px/6*5)]">
                    <p>{user.bio}</p>
                  </div>
                )}
              </div>
            </>
          }
          contentChildren={
            <>
              <div className="3xl:w-[882px] w-[735px] overflow-hidden py-[30px] 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)] mx-auto">
                <PostTabs id={params.id} />
              </div>
            </>
          }
        />
      ) : (
        <></>
      )}
    </DefaultLayout>
  );
}
