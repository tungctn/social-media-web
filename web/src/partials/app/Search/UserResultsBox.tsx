"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import User from "@/utils/fakeData/User";
import { useRouter } from "next/navigation";

type UserResultsBoxProps = {
  users: User[];
  keyword: string;
};

export default function UserResultsBox({ users, keyword }: UserResultsBoxProps) {
  const router = useRouter();
  const handleSeeAll = () => {
    router.push(`/search/all-users/${keyword}`);
  };

  const handleClickUser = (userId: number) => {
    router.push(`/profile/${userId}`);
  };
  return (
    <div>
      <h2 className="font-bold 3xl:text-2xl text-lg text-deep-lilac w-fit -translate-x-full pr-4 mb-[18px]">
        Users
      </h2>
      <div className="bg-white rounded-[30px] py-[30px] px-8">
        <div className="flex flex-col 3xl:gap-4 gap-[calc(16px/6*5)]">
          {users && users.slice(0, 3).map((user) => {
            return (
              <div
                key={user.user_id}
                className="flex flex-row 3xl:gap-4 gap-3 items-center cursor-pointer"
                onClick={() => handleClickUser(user.user_id)}
              >
                <Avatar size={60} />
                <div className="flex flex-col 3xl:gap-[7px] gap-[calc(7px/6*5)]">
                  <span className="font-bold 3xl:text-xl text-[calc(20px/6*5)] leading-[1]">
                    {user.full_name}
                  </span>
                  <span className="3xl:text-[14px] text-[calc(14px/6*5)] leading-[1]">
                    Trang cá nhân gồm 0 người theo dõi, 0 bài viết và có 0 bạn
                    chung
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-[22px] flex justify-center">
          <Button
            onClick={handleSeeAll}
            customClassName="3xl:!h-10 !h-[calc(40px/6*5)] 3xl:!rounded-[10px] !rounded-[calc(10px/6*5)] 3xl:!text-xl !text-[calc(20px/6*5)] 3xl:!w-[265px] !w-[calc(265px/6*5)]"
            title="See all users"
          >
            See All
          </Button>
        </div>
      </div>
    </div>
  );
}
