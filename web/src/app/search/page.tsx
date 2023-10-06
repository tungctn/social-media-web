"use client";

import Container from "@/components/Container";
import DefaultLayout from "@/layouts/DefaultLayout";
import PostResultsList from "@/partials/app/Search/PostResultsList";
import SearchBox from "@/partials/app/Search/SearchBox";
import UserResultsBox from "@/partials/app/Search/UserResultsBox";
import Post, { posts } from "@/utils/fakeData/Post";
import User, { users } from "@/utils/fakeData/User";
import Image from "next/image";
import { useEffect, useState } from "react";
import NotFoundImg from "@/assets/imgs/404.png";

export default function Search() {
  const [results, setResults] = useState<{
    users: User[] | null;
    posts: Post[] | null;
  }>();
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getResults();
  }, [searchKey]);

  const getResults = async () => {
    setResults({
      users,
      posts,
    });
  };

  const handleSearch = (searchKey: any) => {
    setSearchKey(searchKey);
    setResults(undefined);
  };

  return (
    <DefaultLayout>
      <Container fixedHeight={false}>
        <div className="w-full 3xl:my-[60px] my-12">
          <h1 className="3xl:text-[32px] text-2xl text-deep-lilac font-bold 3xl:ml-[60px] ml-12">
            Search
          </h1>
          <div className="mt-5 mx-auto 3xl:w-[794px] w-[calc(794px/6*5)]">
            <SearchBox onSearch={handleSearch} defaultValue={searchKey} />
            <div className="mt-[30px] flex flex-col gap-[22px]">
              {results?.users || results?.posts ? (
                <>
                  {results?.users && <UserResultsBox users={results.users} />}
                  {results?.posts && <PostResultsList posts={results.posts} />}
                </>
              ) : (
                <div className="3xl:mt-[23px] mt-[calc(53px/6*5-30px)] flex flex-col 3xl:gap-[37px] gap-[calc(37px/6*5)] items-center">
                  <h1 className="font-black 3xl:text-5xl text-[calc(48px/6*5)] text-deep-lilac/[.24]">
                    No result found
                  </h1>
                  <div className="text-spanish-gray 3xl:text-[14px] text-[calc(14px/6*5)] flex flex-col gap-3 leading-[1] items-center">
                    <span>We couldn’t any search results</span>
                    <span>Give it another go</span>
                  </div>
                  <div className="3xl:mt-10 mt-[calc(40px/6*5)]">
                    <Image
                      src={NotFoundImg}
                      alt="404 | Not found"
                      className="3xl:w-[441px] w-[calc(441px/6*5)] 3xl:h-[410px] h-[calc(410px/6*5)] object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  );
}
