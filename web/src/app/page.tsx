import DefaultLayout from "@/layouts/DefaultLayout";
import FriendsList from "@/partials/app/HomePage/FriendsList";
import NeareastPost from "@/partials/app/HomePage/NeareastPost";
import PostBox from "@/partials/app/HomePage/PostBox";
import WelcomBox from "@/partials/app/HomePage/WelcomBox";
import SmallCatImg from "@/assets/imgs/small-cat-2.png";
import Image from "next/image";
import PostsList from "@/partials/app/HomePage/PostsList";
import PostModal from "@/components/PostModal";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex relative rounded-l-[30px] bg-cultured">
        <div className="px-[50px] w-full mt-[85px]">
          <div className="mb-[27px]">
            <WelcomBox />
          </div>
          <PostBox />
          <div className="my-[25px]">
            <PostsList />
          </div>
        </div>
        <div className="3xl:min-w-[calc(412px)] 3xl:max-w-[calc(412px)] min-w-[calc(412px/6*5)] max-w-[calc(412px/6*5)] mr-[33px] my-[70px] relative">
          <div className="flex flex-col gap-[30px] w-full">
            <FriendsList />
            <NeareastPost />
            <Image src={SmallCatImg} alt="small-cat" />
          </div>
        </div>
        <PostModal />
      </div>
    </DefaultLayout>
  );
}
