"use client";

import DefaultLayout from "@/layouts/DefaultLayout";
import FriendsList from "@/partials/app/HomePage/FriendsList";
import NeareastPost from "@/partials/app/HomePage/NeareastPost";
import PostBox from "@/partials/app/HomePage/PostBox";
import WelcomBox from "@/partials/app/HomePage/WelcomBox";
import SmallCatImg from "@/assets/imgs/small-cat-2.png";
import Image from "next/image";
import PostsList from "@/partials/app/HomePage/PostsList";
import PostModal from "@/components/PostModal";
import { useSelector } from "react-redux";
import { Role } from "@/utils/fakeData/User";
import UserLoginChart from "@/partials/app/HomePage/UserLoginChart";
import StatisticalBox from "@/partials/app/HomePage/StatisticalBox";
import PostPieCharts from "@/partials/app/HomePage/PostsPieCharts";

export default function Home() {
  const auth = useSelector((state: any) => state.auth);
  return (
    <DefaultLayout>
      <div
        className={
          "flex relative rounded-l-[30px] bg-cultured " +
          (auth.user?.role === Role.Admin ? "flex-col 3xl:gap-12 gap-10 3xl:pb-[60px] pb-[calc(60px/6*5)]" : "flex-row")
        }
      >
        {auth.user && (
          <>
            <div className="flex flex-row">
              <div className="px-[50px] w-full mt-[50px]">
                <div className="mb-[27px]">
                  <WelcomBox />
                </div>
                {auth.user.role === Role.User && (
                  <>
                    <PostBox />
                    <div className="my-[25px]">
                      <PostsList />
                    </div>
                  </>
                )}
                {auth.user.role === Role.Admin && <UserLoginChart />}
              </div>
              {auth.user.role === Role.Admin && (
                <div className="3xl:mr-[63px] mr-[calc(63px/6*5)] mt-[53px] min-w-fit">
                  <StatisticalBox />
                </div>
              )}
            </div>
            {auth.user.role === Role.User && (
              <div className="3xl:min-w-[calc(412px)] 3xl:max-w-[calc(412px)] min-w-[calc(412px/6*5)] max-w-[calc(412px/6*5)] mr-[33px] my-[70px] relative">
                <div className="flex flex-col gap-[30px] w-full">
                  <FriendsList />
                  <NeareastPost />
                  <Image src={SmallCatImg} alt="small-cat" />
                </div>
              </div>
            )}
            {auth.user.role === Role.Admin && (
              <div className="3xl:mr-[63px] mr-[calc(63px/6*5)] w-full px-[50px]">
                <PostPieCharts />
              </div>
            )}
            <PostModal />
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
