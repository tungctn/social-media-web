"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { deleteAvatar, updateUser } from "@/services/userServices";
import { checkLogedInAction } from "@/store/actions/authActions";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type ProfileAvatarProps = {
  src?: string;
};

export default function ProfileAvatar({ src }: ProfileAvatarProps) {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>();
  const dispatch = useDispatch();
  const preview = useRef({ url: "" });

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview.current.url);
    };
  }, []);

  useEffect(() => {
    if (preview.current.url) {
      setCurrentSrc(preview.current.url);
    } else {
      setCurrentSrc(src);
    }
  }, [src, preview.current.url]);

  const handleChangeAvatar = async (event: any) => {
    const img = event.target.files[0];
    const newAvatar = new FormData();
    newAvatar.append("avatar", img);
    try {
      await updateUser(newAvatar);
      toast.success("Changed avatar!");
      preview.current.url = URL.createObjectURL(img);
      dispatch(checkLogedInAction() as any);
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAvatar();
      toast.success("Deleted avatar!");
      preview.current.url = "";
      setCurrentSrc(undefined);
      dispatch(checkLogedInAction() as any);
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center h-full w-full top-0 left-0 rounded-full bg-spanish-gray/80 opacity-0 transition-all duration-300 hover:opacity-100">
        <div className="flex flex-col 3xl:gap-[10px] gap-[calc(10px/6*5)]">
          <Button customClassName="3xl:!text-[14px] !leading-[1] !text-[calc(14px/6*5)] 3xl:!h-[30px] !h-[calc(30px/6*5)] 3xl:!rounded-[10px] !rounded-[calc(10px)] !bg-transparent !text-deep-lilac 3xl:w-[114px] w-[calc(114px/6*5)]">
            <div className="relative">
              <input
                type="file"
                title="Upload avatar"
                className="absolute h-full w-full opacity-0"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChangeAvatar}
              />
              Edit avatar
            </div>
          </Button>
          <Button
            onClick={handleDelete}
            customClassName="3xl:!text-[14px] !leading-[1] !text-[calc(14px/6*5)] 3xl:!h-[30px] !h-[calc(30px/6*5)] 3xl:!rounded-[10px] !rounded-[calc(10px)] !bg-transparent !text-deep-lilac 3xl:w-[114px] w-[calc(114px/6*5)]"
          >
            Delete avatar
          </Button>
        </div>
      </div>
      <Avatar size={202} src={currentSrc} />
    </div>
  );
}
