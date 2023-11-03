import { LoadingContext } from "@/providers/LoadingProvider";
import { createComment } from "@/services/commentServices";
import { moderateImage, uploadImage } from "@/services/imageServices";
import Image from "next/image";
import { forwardRef, useContext, useEffect, useRef } from "react";
import {
  FaImages,
  FaRegFaceSmile,
  FaRegPaperPlane,
  FaTrash,
} from "react-icons/fa6";
import { toast } from "react-toastify";

type PostCommentFieldProps = {
  postId: number;
  onSend: Function;
  onChange: Function;
  reply?: any;
};

function PostCommentField(
  { postId, onSend, onChange, reply }: PostCommentFieldProps,
  ref: any,
) {
  const { setIsLoading } = useContext(LoadingContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const img = useRef({
    url: "",
    file: null,
  });

  useEffect(() => {
    if (reply && textareaRef.current) {
      textareaRef.current.value = "Reply " + reply.user.full_name + " ";
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
    const regex = reply ? new RegExp(`^Reply ${reply.user.full_name} `) : "";
    const content = reply
      ? event.target.content.value.replace(regex, "")
      : event.target.content.value;
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

      const newComment = {
        content: content,
        comment_reply: reply ? reply.id : null,
        post_id: postId,
        created_at: new Date(),
        image_ids,
      };

      try {
        const res = await createComment(newComment);

        onSend({
          id: res.data.comment.id,
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
        });
        img.current = {
          url: "",
          file: null,
        };
        event.target.reset();
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
    console.log("delete");

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
        <div className="3xl:min-h-[60px] min-h-[48px] w-full">
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
    </div>
  );
}

export default forwardRef(PostCommentField);
