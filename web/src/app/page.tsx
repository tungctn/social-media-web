import DefaultLayout from "@/layouts/DefaultLayout";
import FriendsList from "@/partials/app/HomePage/FriendsList";
import NeareastPost from "@/partials/app/HomePage/NeareastPost";
import PostBox from "@/partials/app/HomePage/PostBox";
import WelcomBox from "@/partials/app/HomePage/WelcomBox";
import SmallCatImg from "@/assets/imgs/small-cat-2.png";
import Image from "next/image";
import PostsList from "@/partials/app/HomePage/PostsList";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex relative">
        <div className="px-[50px] w-full mt-[85px]">
          <div className="mb-[27px]">
            <WelcomBox />
          </div>
          <PostBox />
          <div className="my-[25px]">
            <PostsList />
          </div>
        </div>
        <div className="3xl:max-w-[412px] max-w-[360px] mr-[33px] my-[70px] relative">
          <div className="flex flex-col gap-[30px] w-full">
            <FriendsList />
            <NeareastPost />
            <Image src={SmallCatImg} alt="small-cat" />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
