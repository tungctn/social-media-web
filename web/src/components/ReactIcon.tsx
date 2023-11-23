import { ReactType } from "@/constants/Others";
import Image from "next/image";
import { useCallback } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import EmojiLoveImg from "@/assets/imgs/emojilove 1.png";
import EmojiCuteImg from "@/assets/imgs/emojicute 1.png";
import EmojiWowImg from "@/assets/imgs/emojiwow 1.png";
import EmojiCryImg from "@/assets/imgs/emojicry 1.png";
import EmojiAngryImg from "@/assets/imgs/emojiangry 1.png";

type ReactIconProps = {
  reactType?: ReactType | null;
};

export default function ReactIcon({ reactType }: ReactIconProps) {
  const renderIcon = useCallback(() => {
    switch (reactType) {
      case ReactType.like:
        return (
          <div
            className={
              "transition-all ease-linear hover:scale-105 hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)]"
            }
          >
            <FaThumbsUp />
          </div>
        );
      case ReactType.love:
        return (
          <Image
            src={EmojiLoveImg}
            alt="love"
            className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          />
        );
      case ReactType.cute:
        return (
          <Image
            src={EmojiCuteImg}
            alt="cute"
            className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          />
        );
      case ReactType.angry:
        return (
          <Image
            src={EmojiAngryImg}
            alt="angry"
            className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          />
        );
      case ReactType.sad:
        return (
          <Image
            src={EmojiCryImg}
            alt="cry"
            className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          />
        );
      case ReactType.wow:
        return (
          <Image
            src={EmojiWowImg}
            alt="wow"
            className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          />
        );
      default:
        return (
          <div
            className={
              "transition-all ease-linear hover:text-deep-lilac 3xl:text-[30px] text-[calc(30px/6*5)] hover:scale-105 hover:animate-shaking-like"
            }
          >
            <FaRegThumbsUp />
          </div>
        );
    }
  }, [reactType]);

  const renderLabel = () => {
    switch (reactType) {
      case ReactType.like:
        return "Liked";
      case ReactType.love:
        return "Loved";
      case ReactType.angry:
        return "Angry";
      case ReactType.cute:
        return "Cute";
      case ReactType.sad:
        return "Sad";
      case ReactType.wow:
        return "Wow";
      default:
        return "Like";
    }
  };

  return (
    <div
      className={
        "flex flex-row gap-[5px] items-center " +
        (reactType ? "text-deep-lilac hover:text-deep-lilac/80" : "")
      }
    >
      {renderIcon()}
      {renderLabel()}
    </div>
  );
}
