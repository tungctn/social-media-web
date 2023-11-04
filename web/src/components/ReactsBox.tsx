import Image from "next/image";
import { FaRegThumbsUp } from "react-icons/fa6";
import EmojiLoveImg from "@/assets/imgs/emojilove 1.png";
import EmojiCuteImg from "@/assets/imgs/emojicute 1.png";
import EmojiWowImg from "@/assets/imgs/emojiwow 1.png";
import EmojiCryImg from "@/assets/imgs/emojicry 1.png";
import EmojiAngryImg from "@/assets/imgs/emojiangry 1.png";
import { ReactType } from "@/constants/Others";
import { reactPost, unReactPost } from "@/services/postService";
import { toast } from "react-toastify";

type ReactsBoxProps = {
  onReact: Function;
};

export default function ReactsBox({
  onReact,
}: ReactsBoxProps) {
  return (
    <div
      className={
        "bg-white 3xl:h-[42px] h-[calc(42px/6*5)] border-deep-lilac border-[1px] rounded-[10px] 3xl:w-[238px] w-[calc(238px/6*5)] px-3 z-10 relative justify-center animate-slip-to-top"
      }
    >
      <div className="flex flex-row items-center h-full w-full justify-between">
        <div
          className={
            "transition-all ease-linear hover:text-deep-lilac hover:scale-[1.75] 3xl:text-[30px] text-[calc(30px/6*5)] text-deep-lilac"
          }
          onClick={() => onReact(ReactType.like)}
        >
          <FaRegThumbsUp />
        </div>
        <Image
          src={EmojiLoveImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => onReact(ReactType.love)}
        />
        <Image
          src={EmojiCuteImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => onReact(ReactType.cute)}
        />
        <Image
          src={EmojiWowImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => onReact(ReactType.wow)}
        />
        <Image
          src={EmojiCryImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => onReact(ReactType.sad)}
        />
        <Image
          src={EmojiAngryImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => onReact(ReactType.angry)}
        />
      </div>
    </div>
  );
}
