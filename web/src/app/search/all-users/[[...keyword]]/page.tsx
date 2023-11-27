"use client";

import Container from "@/components/Container";
import SearchUserCard from "@/components/SearchUserCard";
import DefaultLayout from "@/layouts/DefaultLayout";
import { LoadingContext } from "@/providers/LoadingProvider";
import { searchUser } from "@/services/userServices";
import { users } from "@/utils/fakeData/User";
import { useContext, useEffect, useState } from "react";

export default function AllUsersResult({
  params,
}: {
  params: { keyword: string[] };
}) {
  const [data, setData] = useState<any>();
  const { setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    getData();
  }, [params.keyword]);

  const getData = async () => {
    setIsLoading(true);
    const userResults: any = await searchUser({
      text_search: params.keyword ? params.keyword[0] : "",
    });
    setIsLoading(false);
    setData(userResults.data.data_search);
  };
  return (
    <DefaultLayout>
      <Container fixedHeight={false}>
        <div className="w-full 3xl:my-[60px] my-12">
          <h1 className="3xl:text-[32px] text-2xl text-deep-lilac font-bold 3xl:ml-[60px] ml-12">
            Search
          </h1>
          <div className="mt-5 mx-auto 3xl:w-[794px] w-[calc(794px/6*5)] px-[11px] flex flex-col gap-5">
            {data &&
              data.map((user: any) => {
                return <SearchUserCard key={user.user_id} user={user} />;
              })}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  );
}
