import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { checkLogedInAction } from "@/store/actions/authActions";

type CheckAuthProps = {
  children: ReactNode;
};

export default function CheckAuth({ children }: CheckAuthProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    checkUserLogedIn();
  }, [auth.isLogedIn]);

  const checkUserLogedIn = () => {
    dispatch(checkLogedInAction() as any);
  };

  return <>{children}</>;
}
