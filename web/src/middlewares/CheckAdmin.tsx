"use client";

import { useSelector } from "react-redux";
import { ReactNode, useCallback } from "react";
import { Role } from "@/utils/fakeData/User";
import UnauthorizedError from "@/components/401Error";
import Loading from "@/components/Loading";

type CheckAdminProps = {
  children: ReactNode;
};

export default function CheckAdmin({ children }: CheckAdminProps) {
  const auth: any = useSelector((state: any) => state.auth);

  const render = useCallback(() => {
    if (auth.user === undefined) {
      return <Loading />;
    } else if (auth.user?.role === Role.Admin) {
      return null;
    } else {
      return <UnauthorizedError />;
    }
  }, [auth]);

  return <>{render() ? render() : children}</>;
}
