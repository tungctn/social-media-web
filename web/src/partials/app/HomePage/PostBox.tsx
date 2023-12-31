"use client";

import Avatar from "@/components/Avatar";
import { MouseEventHandler } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import usePostModal from "@/hooks/usePostModal";

export default function PostBox() {
  const handleUpImage: MouseEventHandler<HTMLDivElement> = () => {};
  const postModal = usePostModal();
  const handleSelectEmoji: MouseEventHandler<HTMLDivElement> = () => {};

  return (
    <div className="bg-white rounded-[30px] shadow-custom pt-9 pb-[13px]">
      <div className="flex flex-row gap-[19px] px-6 pb-[22px]">
        <Avatar size={50} />
        <input
          title="post"
          placeholder="How you feel now ?"
          className="h-[50px] border-0 rounded-[20px] bg-cultured px-8 w-full placeholder:text-spanish-gray focus:ring-deep-lilac"
          onClick={() => {
            postModal.onOpen();
          }}
        />
      </div>
      <div className="ml-[125px] flex flex-row gap-[150px]">
        <div
          className="flex flex-row gap-1 items-center cursor-pointer"
          onClick={handleUpImage}
        >
          <FaRegImage color="#79CA6C" size={30} />
          <span className="font-bold text-spanish-gray">Image</span>
        </div>
        <div
          className="flex flex-row gap-1 items-center cursor-pointer"
          onClick={handleSelectEmoji}
        >
          <FaRegSmile color="#F4CE0C" size={30} />
          <span className="font-bold text-spanish-gray">Emoji</span>
        </div>
      </div>
    </div>
  );
}
