"use client";

import DefaultLayout from "@/layouts/DefaultLayout";
import PostTabs from "@/partials/app/Profile/PostTabs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Sidebar from "@/partials/app/Profile/Sidebar";
import { getUserById } from "@/services/userServices";

export default function Profile({ params }: { params: { id: number } }) {
  const auth = useSelector((state: any) => state.auth);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    auth.isLogedIn && getUserInfo();
  }, [params.id, auth.isLogedIn]);  

  const getUserInfo = async () => {
    if (Number(params.id) === auth.user.user_id) {
      setUser(auth.user);
    } else {
      const res: any = await getUserById(params.id);      
      const userData = {
        email: res.data.email,
        friend: res.data.friend,
        ...res.data.user_info,
      };

      setUser(userData);
    }
  };  

  return (
    <DefaultLayout>
      {user ? (
        <Container
          sidebarChildren={<Sidebar user={user} />}
          contentChildren={
            <>
              <div className="3xl:w-[882px] 2xl:w-[735px] xl:w-[640px] w-[560px] overflow-hidden py-[30px] 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)] mx-auto">
                <PostTabs id={params.id} />
              </div>
            </>
          }
        />
      ) : (
        <></>
      )}
    </DefaultLayout>
  );
}
