import BoxHeader from "@/components/BoxHeader";
import { nearestPost } from "@/utils/fakeData/Post";
import Image from "next/image";
import MonsterImg from "@/assets/imgs/monster-1.png";
import Button from "@/components/Button";

export default function NeareastPost() {
  return (
    <div className="bg-white rounded-[30px] pt-[30px] pb-[17px] px-[30px] w-full">
      <BoxHeader title="Nearest Post" />
      <div className="flex flex-row mt-3 gap-9 min-w-max">
        <div className="min-w-[140px] relative cursor-pointer">
          <Image
            src={nearestPost.images[0].url}
            alt={"post-" + nearestPost.id}
            className="h-[113px] object-cover rounded-[10px] z-10 relative"
            width={140}
            height={113}
          />
          {nearestPost.images.length > 1 && (
            <div className="h-[113px] w-full absolute bg-light-silver rounded-[10px] -top-[5px] left-5">
              <span className="translate-y-[52px] -translate-x-[5px] float-right text-deep-lilac text-xs font-bold">
                +{nearestPost.images.length - 1}
              </span>
            </div>
          )}
        </div>
        {nearestPost.content ? (
          <p className="text-xs line-clamp-3 text-ellipsis h-fit">
            {nearestPost.content}
          </p>
        ) : (
          <div className="min-w-fit">
            <span className="font-bold text-2xl text-spanish-gray min-w-fit">
              No caption
            </span>
            <div className="mt-[6px]">
              <Image
                src={MonsterImg}
                alt="no-caption"
                className="-mb-[3.015px] mx-auto z-10 relative"
              />
              <Button customClassName="!text-xs !h-[30px] !rounded-[10px]">
                Add caption
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
