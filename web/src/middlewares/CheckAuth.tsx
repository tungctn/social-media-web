"use client";

import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";
import { checkLogedInAction } from "@/store/actions/authActions";
import { getPosts } from "@/store/actions/postActions";

type CheckAuthProps = {
  children: ReactNode;
};

export default function CheckAuth({ children }: CheckAuthProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const postState = useSelector((state: any) => state.postState);

  useEffect(() => {
    checkUserLogedIn();
  }, [auth.isLogedIn]);

  useEffect(() => {
    loadAllPosts();
  }, [postState.posts.length]);

  const checkUserLogedIn = () => {
    dispatch(checkLogedInAction() as any);
  };

  const loadAllPosts = () => {
    dispatch(getPosts() as any);
  };

  return <>{children}</>;
}
