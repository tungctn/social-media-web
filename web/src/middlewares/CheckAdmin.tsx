"use client";

import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { Role } from "@/utils/fakeData/User";
import UnauthorizedError from "@/components/401Error";

type CheckAdminProps = {
  children: ReactNode;
};

export default function CheckAdmin({ children }: CheckAdminProps) {
  const auth: any = useSelector((state: any) => state.auth);

  return (
    <>{auth.user?.role !== Role.Admin ? children : <UnauthorizedError />}</>
  );
}
