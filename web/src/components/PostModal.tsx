"use client";

import { FaRegClock, FaRegImage } from "react-icons/fa6";
import Avatar from "./Avatar";
import Modal from "./Modal";
import usePostModal from "@/hooks/usePostModal";
import { FaRegSmile } from "react-icons/fa";
import { BsFillTagsFill } from "react-icons/bs";
import { uploadImage } from "@/services/imageServices";
import { toast } from "react-toastify";

const PostModal = () => {
  const { isOpen, onClose } = usePostModal();
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await uploadImage(file);
        console.log(response);
        toast.success("Upload image successfully!");
      } catch (error) {
        console.error("Error uploading the image:", error);
        toast.error("Error uploading the image!");
      }
    }
  };

  const bodyContent = (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <Avatar size={50} />
            <div className="flex flex-col">
              <span className="font-semibold text-base">Nguyen Van A</span>
              <span className="text-spanish-gray text-xs">Thời gian đăng</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaRegClock size={15} color="#9551BA" />
            <span className="text-spanish-gray text-xs">2</span>
          </div>
        </div>
        <div className="mt-3">
          <textarea
            placeholder="Write your caption"
            className={`
          w-full
          peer
          p-4
          pt-6
          font-light
          bg-beige
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-deep-lilac
          border-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
      `}
            rows={5}
          />
        </div>
        <div className="mt-3 flex items-center rounded-3xl border-deep-lilac w-full px-12 py-6 border">
          <p className="text-lg opacity-50">Add in your post</p>
          <FaRegImage
            color="#79CA6C"
            size={40}
            className="mr-10 ml-20 cursor-pointer"
            onClick={() => document.getElementById("imageInput")?.click()}
          />
          <FaRegSmile
            color="#F4CE0C"
            size={40}
            className="mr-10 cursor-pointer"
          />
          <BsFillTagsFill
            color="#9551BA"
            size={40}
            className="mr-10 cursor-pointer"
          />
          <input
            type="file"
            id="imageInput"
            hidden
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      onClose={onClose}
      body={bodyContent}
      title="Create a new Post"
      actionLabel="Post"
      isOpen={isOpen}
    />
  );
};

export default PostModal;
