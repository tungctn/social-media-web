import Image from "next/image";
import { FaRegThumbsUp } from "react-icons/fa6";
import EmojiLoveImg from "@/assets/imgs/emojilove 1.png";
import EmojiCuteImg from "@/assets/imgs/emojicute 1.png";
import EmojiWowImg from "@/assets/imgs/emojiwow 1.png";
import EmojiCryImg from "@/assets/imgs/emojicry 1.png";
import EmojiAngryImg from "@/assets/imgs/emojiangry 1.png";
import { REACT_TYPE } from "@/constants/Others";
import { reactPost } from "@/services/postService";
import { toast } from "react-toastify";

type ReactsBoxProps = {
  postId: number;
  onClose: Function;
  onChange: Function;
};

export default function ReactsBox({
  postId,
  onClose,
  onChange,
}: ReactsBoxProps) {
  const handleReact = async (reactType: REACT_TYPE) => {
    try {
      await reactPost(postId, reactType);
      onChange(reactType);
    } catch (error) {
      toast.error("Error!");
    }
    onClose();
  };
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
          onClick={() => handleReact(REACT_TYPE.like)}
        >
          <FaRegThumbsUp />
        </div>
        <Image
          src={EmojiLoveImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => handleReact(REACT_TYPE.love)}
        />
        <Image
          src={EmojiCuteImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => handleReact(REACT_TYPE.cute)}
        />
        <Image
          src={EmojiWowImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => handleReact(REACT_TYPE.wow)}
        />
        <Image
          src={EmojiCryImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => handleReact(REACT_TYPE.sad)}
        />
        <Image
          src={EmojiAngryImg}
          alt="love"
          className="3xl:h-[24px] h-[calc(24px/6*5)] 3xl:w-[24px] w-[calc(24px/6*5)] object-contain transition-all ease-linear hover:scale-[1.75]"
          onClick={() => handleReact(REACT_TYPE.angry)}
        />
      </div>
    </div>
  );
}
