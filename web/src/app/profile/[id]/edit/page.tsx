"use client";

import Container from "@/components/Container";
import DefaultLayout from "@/layouts/DefaultLayout";
import InfoForm from "@/partials/app/Profile/InfoForm";
import Sidebar from "@/partials/app/Profile/Sidebar";
import { useSelector } from "react-redux";

export default function ProfileEdit() {
  const auth = useSelector((state: any) => state.auth);
  return (
    <DefaultLayout>
      <Container
        fixedHeight={false}
        sidebarChildren={auth.user && <Sidebar user={auth.user} />}
        contentChildren={
          <div className="3xl:my-[83px] my-[calc(83px/6*5)] 3xl:ml-[85px] ml-[calc(85px/6*5)] 3xl:mr-11 mr-10">
            <h1 className="3xl:text-[32px] text-[calc(32px/6*5)] font-medium text-deep-lilac 3xl:mb-[66px] mb-[calc(66px/6*5)]">
              Edit account
            </h1>
            <InfoForm />
          </div>
        }
      />
    </DefaultLayout>
  );
}
