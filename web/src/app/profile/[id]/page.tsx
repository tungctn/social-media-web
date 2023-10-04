"use client";

import DefaultLayout from "@/layouts/DefaultLayout";
import Image from "next/image";
import PhgImg from "@/assets/imgs/phg-1.png";
import Avatar from "@/components/Avatar";
import { currentUser, users } from "@/utils/fakeData/User";
import UserActionsButton from "@/partials/app/Profile/UserActionsButton";
import UserActions from "@/partials/app/Profile/UserActions";
import PostTabs from "@/partials/app/Profile/PostTabs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Profile({ params }: { params: { id: number } }) {
  const auth = useSelector((state: any) => state.auth);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    getUserInfo();
  }, [params.id]);

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
        <div className="flex flex-row 3xl:my-10 my-8 bg-cultured rounded-[30px] 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)] 3xl:mr-10 mr-8">
          <div className="3xl:min-w-[462px] 3xl:w-[462px] min-w-[calc(462px/6*5)] w-[calc(462px/6*5)] flex flex-col overflow-auto scrollbar-thin scroll-smooth pb-8">
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
          </div>
          <div className="rounded-[30px] bg-light-silver w-full shadow-[-28px_0px_20px_-20px_rgba(0,0,0,.5)]">
            <div className="3xl:w-[882px] w-[735px] overflow-hidden py-[30px] 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)] mx-auto">
              <PostTabs id={params.id} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </DefaultLayout>
  );
}
