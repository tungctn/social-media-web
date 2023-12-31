"use client";

import { FaArrowLeftLong, FaRegClock, FaRegImage } from "react-icons/fa6";
import Avatar from "./Avatar";
import Modal from "./Modal";
import usePostModal from "@/hooks/usePostModal";
import { FaRegSmile } from "react-icons/fa";
import { BsFillTagsFill } from "react-icons/bs";
import { moderateImage, uploadImage } from "@/services/imageServices";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  moderateContent,
  updatePost,
} from "@/services/postService";
import { get } from "cypress/types/lodash";
import { GET_POSTS } from "@/store/constants/postType";
import { getPosts } from "@/store/actions/postActions";
import PostTypeSelect from "./PostSelectType";
import EmojiPicker from "emoji-picker-react";

const PostModal = () => {
  const auth = useSelector((state: any) => state.auth);
  const { isOpen, onClose, isEdit, postDetail } = usePostModal();
  const [isImageView, setIsImageView] = useState(false);
  const [content, setContent] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [postType, setPostType] = useState<any>(null);
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setContent(postDetail?.content);
      setUploadedImages(postDetail?.images);
    } else {
      setContent("");
      setUploadedImages([]);
    }
  }, [isEdit]);

  const handleImageChange = async (e: any) => {
    const files = Array.from(e.target.files);
    const uploadeds: any[] = [];
    for (let file of files) {
      if (file) {
        try {
          const response = await uploadImage(file as File);
          const moderate = await moderateImage(response.data.image.url);
          if (!moderate.success) {
            toast.error(moderate.message);
            continue;
          } else {
            toast.success(moderate.message);
            uploadeds.push(response.data.image);
          }
        } catch (error) {
          toast.error("Error uploading the image!");
        }
      }
    }
    setUploadedImages([...uploadedImages, ...uploadeds]);
  };

  const handleEditClick = () => {
    setIsImageView(!isImageView);
  };

  const handleDeleteImage = (indexToDelete: number) => {
    const newImages = uploadedImages.filter(
      (_, index) => index !== indexToDelete
    );
    setUploadedImages(newImages);
  };

  const handleClickEmoji = (emoji: any) => {
    setContent(content + emoji.emoji);
  };

  const handleSubmit = async () => {
    try {
      const imageIds = uploadedImages.reduce((acc, image) => {
        acc.push(image.id);
        return acc;
      }, []);
      const postInfo = {
        content,
        image_ids: imageIds,
        user_id: auth.user.user_id,
        label: postType,
      };
      const moderate = await moderateContent(content.replace(/\n/g, " "));
      if (!moderate.success) {
        toast.error(moderate.message);
        return;
      }
      const response = isEdit
        ? await updatePost(postDetail?.id, postInfo)
        : await createPost(postInfo);
      if (response.data) {
        toast.success("Create post successfully!");
        onClose();
        setUploadedImages([]);
        setContent("");
        dispatch(getPosts() as any);
      }
    } catch (error: any) {
      toast.error("Error creating post!");
    }
  };

  const headerContent = (
    <button
      className="
                      p-1
                      border-0
                      hover:opacity-70
                      transition
                      absolute
                      left-9
                  "
      onClick={handleEditClick}
    >
      <FaArrowLeftLong size={28} color="#9551BA" className="stroke-2" />
    </button>
  );

  const bodyContent = (
    <div className="flex flex-col items-center">
      {!isImageView ? (
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <Avatar size={50} />
              <div className="flex flex-col">
                <span className="font-semibold text-base">
                  {auth.user.full_name}
                </span>
                <span className="text-spanish-gray text-xs"></span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PostTypeSelect
                onChange={(postType: any) => {
                  setPostType(postType);
                }}
              />
            </div>
          </div>
          <div className="mt-3">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
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
          <div className="mt-4 flex flex-wrap items-center rounded-t-3xl border-deep-lilac p-4 border mx-8">
            <div className="w-1/4 mb-4 flex flex-row">
              <Button
                customClassName="bg-lavender border-none"
                onClick={handleEditClick}
              >
                <p className="text-spanish-gray">Edit images</p>
              </Button>
            </div>
            <div
              className={`w-full flex flex-row flex-wrap overflow-y-auto ${
                uploadedImages.length > 0 ? "h-[200px]" : "h-[0px]"
              }  `}
            >
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative w-[45%] m-2">
                  <img
                    src={image.url}
                    alt="Uploaded"
                    className="rounded-lg mb-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center rounded-3xl border-deep-lilac w-full px-12 py-6 border">
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
              onClick={() => {
                setIsEmojiPicker(!isEmojiPicker);
              }}
            />
            <div
              className="absolute bottom-[100px] animate-slip-to-top"
              style={{
                display: isEmojiPicker ? "block" : "none",
              }}
            >
              <EmojiPicker onEmojiClick={handleClickEmoji} />
            </div>

            <BsFillTagsFill
              color="#9551BA"
              size={40}
              className="mr-10 cursor-pointer"
            />
            <input
              type="file"
              id="imageInput"
              hidden
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-row flex-wrap overflow-y-auto h-[400px]">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative w-[45%] m-2">
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="rounded-lg mb-2 w-full"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-1 right-1 p-1 rounded-full border-2 border-deep-lilac hover:bg-gray-300 transition text-deep-lilac"
                >
                  <IoClose color="#9551BA" size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      onClose={onClose}
      body={bodyContent}
      title={isImageView ? "Images" : "Create a new Post"}
      actionLabel={isEdit ? "Update" : "Post"}
      isOpen={isOpen}
      header={isImageView ? headerContent : undefined}
      isButtonClose={isImageView}
      onSubmit={handleSubmit}
    />
  );
};

export default PostModal;
