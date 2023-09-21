import BoxHeader from "@/components/BoxHeader";
import { nearestPost } from "@/utils/fakeData/Post";
import Image from "next/image";

export default function NeareastPost() {
  return (
    <div className="bg-white rounded-[30px] pt-[23px] pb-[21px] px-[23px] w-full">
      <BoxHeader title="Nearest Post" />
      <div className="mt-5 flex flex-row gap-[13px]">
        <Image
          src={nearestPost.images[0]}
          alt={"post-" + nearestPost.id}
          className="w-[84px] h-[58px] object-cover"
          width={84}
          height={58}
          objectFit="cover"
        />
        <p className="text-xs line-clamp-3 text-ellipsis h-fit">
          {nearestPost.caption}
        </p>
      </div>
    </div>
  );
}
