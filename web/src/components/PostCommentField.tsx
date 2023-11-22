"use client";

import { LoadingContext } from "@/providers/LoadingProvider";
import { createComment, updateComment } from "@/services/commentServices";
import { moderateImage, uploadImage } from "@/services/imageServices";
import Image from "next/image";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import {
  FaImages,
  FaRegFaceSmile,
  FaRegPaperPlane,
  FaTrash,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type PostCommentFieldProps = {
  postId: number;
  onSend: Function;
  onChange: Function;
  reply?: any;
  defaultComment?: any;
  disabled?: boolean;
};

function PostCommentField(
  {
    postId,
    onSend,
    onChange,
    reply,
    defaultComment,
    disabled = false,
  }: PostCommentFieldProps,
  ref: any,
) {
  const { setIsLoading } = useContext(LoadingContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const img = useRef({
    url: "",
    file: null,
  });
  const [defaultSate, setDefaultState] = useState({
    reply: null as any,
    defaultComment: null,
  });
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    setDefaultState({
      defaultComment: defaultComment,
      reply: null,
    });
    if (defaultComment && textareaRef.current) {
      textareaRef.current.value = defaultComment.content;
      textareaRef.current.focus();

      img.current.url = defaultComment.images[0]?.url;

      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
      onChange(textareaRef.current.value);
    }
  }, [defaultComment, textareaRef]);

  useEffect(() => {
    setDefaultState({
      defaultComment: null,
      reply: reply,
    });
    if (reply && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [reply]);

  useEffect(() => {
    return () => {
      if (img.current.url) {
        URL.revokeObjectURL(img.current.url);
      }
    };
  }, [img]);

  const handleSendComment = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const content = event.target.content.value;
    if (content || img.current.url) {
      let image_ids = [];
      try {
        if (img.current.file) {
          const res = await uploadImage(img.current.file);
          const moderateRes = await moderateImage(res.data.image.url);

          if (!moderateRes.success) {
            toast.error(moderateRes.message);
            (img.current.url = ""), (img.current.file = null);
          } else {
            image_ids.push(res.data.image.id);
            img.current.url = res.data.image.url;
          }
        }
      } catch (error) {
        toast.error("Error upload image!");
        (img.current.url = ""), (img.current.file = null);
      }

      const newComment: any = {
        content: content,
        comment_reply: defaultSate.reply ? defaultSate.reply.id : null,
        post_id: postId,
        created_at: new Date(),
        image_ids,
        user_id: auth.user.user_id,
      };

      try {
        let commentId = null;

        if (reply) {
          newComment.user_reply_name = reply.user.full_name;
          newComment.user_reply_id = reply.user.id;
        }

        if (defaultComment) {
          if (defaultComment.user_reply_name && defaultComment.user_reply_id) {
            newComment.user_reply_name = defaultComment.user_reply_name;
            newComment.user_reply_id = defaultComment.user_reply_id;
          }
          const res = await updateComment(defaultComment.id, {
            content: newComment.content,
            image_ids: newComment.image_ids,
          });
          commentId = defaultComment.id;
        } else {
          const res = await createComment(newComment);
          commentId = res.data.comment.id;
        }

        onSend(
          {
            id: commentId,
            ...newComment,
            images:
              image_ids.length > 0
                ? [
                    {
                      id: image_ids[0],
                      url: img.current.url,
                    },
                  ]
                : [],
          },
          Boolean(defaultComment),
        );
        img.current = {
          url: "",
          file: null,
        };
        event.target.reset();
        setDefaultState({
          reply: null,
          defaultComment: null,
        });
        if (textareaRef.current) {
          textareaRef.current.style.height = "";
        }
      } catch (error) {
        toast.error("Error!");
      }
    } else {
      event.target.reset();
      toast.error("Please enter comment to send!");
    }
    setIsLoading(false);
  };

  const handleInput = (event: any) => {
    if (textareaRef.current) {
      if (event.target.value !== "") {
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
        onChange(event.target.value);
      } else {
        textareaRef.current.style.height = "";
        onChange(event.target.value);
      }
    }
  };

  const handleKeyDownInput = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (submitRef.current) {
        submitRef.current.click();
      }
    }
  };

  const handleChangeImg = (event: any) => {
    const image = event.target.files[0];
    const imgURL = URL.createObjectURL(image);
    img.current.url = imgURL;
    img.current.file = image;
    onChange(imgURL);
  };

  const handleDeleteImg = () => {
    if (img.current.url) {
      URL.revokeObjectURL(img.current.url);
    }
    (img.current.url = ""), (img.current.file = null);
    onChange("");
  };

  return (
    <div
      ref={ref}
      className="border border-s-0 border-e-0 border-b-0 border-t-deep-lilac w-full text-spanish-gray 3xl:px-10 px-8 flex flex-row items-start 3xl:gap-[74px] gap-14"
    >
      {!disabled && (
        <>
          <div className="3xl:mt-[13px] mt-[calc(13px/6*5)] flex flex-row 3xl:gap-5 gap-3">
            <button
              title="icon"
              type="button"
              className="3xl:text-[30px] text-[calc(30px/6*5)]"
            >
              <FaRegFaceSmile />
            </button>
            <label className="3xl:text-[30px] text-[calc(30px/6*5)] h-fit relative">
              <input
                type="file"
                title="image"
                className="h-0 w-0 absolute"
                accept="image/jpg; image/jpeg; image/png"
                onChange={handleChangeImg}
              />
              <FaImages />
            </label>
          </div>
          <form
            className="flex flex-row w-full h-full"
            onSubmit={handleSendComment}
          >
            <div className="3xl:min-h-[60px] min-h-[48px] w-full relative">
              <span className="absolute 3xl:top-[4px] top-[2px] left-3 text-[8px]">
                {defaultSate.reply ? (
                  <>
                    Reply{" "}
                    <span className="text-deep-lilac font-semibold">
                      {defaultSate.reply.user.full_name}
                    </span>
                  </>
                ) : defaultSate.defaultComment ? (
                  <>Edit</>
                ) : (
                  <></>
                )}
              </span>
              <textarea
                placeholder="Add comment"
                className="border-0 text-[14px] 3xl:h-[calc(60px-13px)] h-[calc(48px-13px)] pb-0 pt-0 3xl:mt-5 mt-3 w-full placeholder:text-spanish-gray placeholder:font-bold focus:outline-none focus:ring-0 scrollbar-thin resize-none"
                autoFocus
                name="content"
                ref={textareaRef}
                onInput={handleInput}
                onKeyDown={handleKeyDownInput}
              />
              {img.current.url && (
                <div className="3xl:mb-[27px] mb-4 relative inline-block">
                  <div className="h-full w-full bg-black/20 absolute top-0 opacity-0 left-0 z-10 hover:opacity-100">
                    <div className="text-vivid-red absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer">
                      <button
                        type="button"
                        title="delete"
                        onClick={handleDeleteImg}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <Image
                    src={img.current.url}
                    alt="preview"
                    height={48}
                    width={72}
                    className="object-contain w-[72px] h-[48px]"
                  />
                </div>
              )}
            </div>
            <div>
              <button
                title="submit"
                type="submit"
                className="3xl:text-[24px] text-[calc(24px/6*5)] 3xl:mt-4 mt-3"
                ref={submitRef}
              >
                <FaRegPaperPlane />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default forwardRef(PostCommentField);
