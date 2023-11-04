"use client";

import Avatar from "@/components/Avatar";
import PostActions from "@/components/PostActions";
import PostCommentField from "@/components/PostCommentField";
import PostReactCounts from "@/components/PostReactCounts";
import PostReacts from "@/components/PostReacts";
import Post from "@/utils/fakeData/Post";
import dayjs from "dayjs";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PostCommentsList from "./PostCommentsList";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import { getPostById } from "@/services/postService";
import { useSelector } from "react-redux";
import useForceUpdate from "@/hooks/useForceUpdate";
import { ReactType } from "@/constants/Others";
import CustomCarousel from "@/components/CustomCarousel";
import { reactPost } from "@/utils/post";

type PostDetailProps = {
  open?: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
  id: number;
  onChange?: Function;
};

export default function PostDetail({
  open = false,
  onClose,
  id,
  onChange = () => {},
}: PostDetailProps) {
  const [post, setPost] = useState<Post | undefined>();
  const headerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const commentsListRef = useRef<HTMLDivElement>(null);
  const [replyComment, setReplyComment] = useState();
  const [newComment, setNewComment] = useState();
  const [editingComment, setEditingComment] = useState();
  const { width } = useWindowDimensions();
  const auth = useSelector((state: any) => state.auth);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    id && getPostData();
  }, [id]);

  useEffect(() => {
    if (headerRef.current && commentsListRef.current && inputRef.current) {
      if (width >= BREAKPOINTS.extraLarge) {
        commentsListRef.current.style.height = `calc(850px - ${headerRef.current.offsetHeight}px - ${inputRef.current.offsetHeight}px)`;
      } else {
        commentsListRef.current.style.height = `calc(850px / 4 * 3 - ${headerRef.current.offsetHeight}px - ${inputRef.current.offsetHeight}px)`;
      }
    }
  }, [width, post, forceUpdate]);

  const getPostData = async () => {
    const res: any = await getPostById(id);
    if (res?.success) {
      setPost(res.data.post);
    }
  };

  const handleSendNewComment = (newComment: any, isExists?: boolean) => {  
    setNewComment({
      ...newComment,
      user: auth.user,
    });
    setEditingComment(undefined);
    if (!isExists) {
      const newPost: any = {
        ...post,
        comments_count: (post?.comments_count ?? 0) + 1,
      };

      onChange({
        comments_count: (post?.comments_count ?? 0) + 1,
      });
      setPost(newPost);
    }
  };

  const renderPostCommentsLists = useCallback(() => {
    if (post) {
      return (
        <PostCommentsList
          postId={post.id}
          onReply={handleReply}
          newComment={newComment}
          onAction={handleAction}
        />
      );
    }
  }, [post, newComment]);

  const handleReply = (comment: any) => {
    setReplyComment(comment);
  };

  const handleAction = (type: string, comment: any) => {
    if (type === "delete") {
      const newPost: any = {
        ...post,
        comments_count: (post?.comments_count ?? 0) - 1,
      };

      onChange({
        comments_count: (post?.comments_count ?? 0) - 1,
      });
      setPost(newPost);
    } else if (type === "edit") {
      console.log(comment);
      
      setNewComment(undefined);
      setEditingComment(comment);
    }
  };

  const handleChangeInput = (newValue: string) => {
    forceUpdate();
  };

  const handleChangeReact = (reactType: ReactType) => {
    const newPost: any = post && reactPost(post, reactType);

    onChange({
      likes_count: newPost.likes_count,
      type_react: newPost.type_react,
    });
    setPost(newPost);
  };

  return (
    <div className="fixed top-0 left-0 z-20">
      <div
        className="w-screen h-screen bg-black/50 absolute top-0 left-0 z-20"
        onClick={onClose}
        data-testid="close-button"
      ></div>
      <div className="bg-white 3xl:h-[850px] h-[calc(850px/4*3)] 3xl:w-[1186px] w-[calc(1186px/4*3)] absolute z-30 top-[50vh] -translate-y-1/2 left-[50vw] -translate-x-1/2 rounded-[30px]">
        <div className="flex flex-row h-full w-full">
          {post ? <CustomCarousel images={post.images} /> : <></>}
          <div className="w-full flex flex-col">
            <div className="flex flex-col 3xl:gap-5 gap-4" ref={headerRef}>
              <div className="3xl:pl-10 pl-8 3xl:pr-[35px] pr-7 3xl:mt-5 mt-4 flex flex-row justify-between w-full">
                <div className="flex flex-row gap-2.5">
                  <Avatar size={50} src={post?.user?.avatar_url} />
                  <div className="flex flex-col">
                    <span className="3xl:text-xl text-base font-bold">
                      {post?.user?.full_name}
                    </span>
                    <span className="first-letter:uppercase text-xs text-spanish-gray">
                      {dayjs(post?.created_at).format("dddd, HH:mm DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
                <PostActions />
              </div>
              <div>
                <div className="flex flex-col gap-[15px]">
                  <p className="text-[14px] 3xl:mx-12 mx-10">{post?.content}</p>
                  <div className="pb-[9px] 3xl:mx-12 mx-10">
                    <PostReactCounts
                      comments={post?.comments_count ?? 0}
                      likes={post?.likes_count ?? 0}
                      shares={post?.shares_count ?? 0}
                      iconCustomClassName="3xl:text-xl text-lg"
                      customClassName="text-xs leading-[12px]"
                    />
                  </div>
                </div>
                <div className="pt-[9px] pb-[8px] border border-l-0 border-r-0 border-deep-lilac">
                  <PostReacts
                    customClassName="text-xs leading-[12px]"
                    iconCustomClassName="3xl:text-2xl text-xl"
                    postId={post?.id ?? 0}
                    reactType={post?.type_react}
                    onChange={handleChangeReact}
                  />
                </div>
              </div>
            </div>
            <div className="h-full relative">
              <div
                className="3xl:pl-10 pl-8 3xl:pr-[94px] pr-[calc(94px/4*3)] max-h-content overflow-auto scrollbar-none"
                ref={commentsListRef}
              >
                {renderPostCommentsLists()}
              </div>
              <div
                className={
                  "w-full min-h-fit " +
                  (!post?.comments || post?.comments?.length === 0
                    ? "absolute bottom-0"
                    : "")
                }
              >
                <PostCommentField
                  onChange={handleChangeInput}
                  ref={inputRef}
                  postId={id}
                  onSend={handleSendNewComment}
                  reply={replyComment}
                  defaultComment={editingComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
