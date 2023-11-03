"use client";

import Container from "@/components/Container";
import { ReportMenu } from "@/constants/DefaultMenu";
import DefaultLayout from "@/layouts/DefaultLayout";
import CheckAdmin from "@/middlewares/CheckAdmin";
import { useCallback, useState } from "react";

export default function Report() {
  const [currentTabId, setCurrentTabId] = useState(0);

  const handleClickTab = (tabId: number) => {
    setCurrentTabId(tabId);
  };

  const renderList = useCallback(() => {
    const Component =
      ReportMenu[Math.floor(currentTabId / 2)].items[currentTabId % 2]
        .Component;
    return <Component />;
  }, [currentTabId]);
  return (
    <CheckAdmin>
      <DefaultLayout>
        <Container
          sidebarChildren={
            <div className="my-10 mx-10">
              <span className="font-bold 3xl:text-[32px] text-2xl text-deep-lilac">
                Report List
              </span>
              <div className="3xl:mt-[90px] mt-12 flex flex-col items-start 3xl:gap-[60px] gap-8">
                {ReportMenu.map((reportMenuItem: any) => {
                  return (
                    <div key={reportMenuItem.id}>
                      <h2 className="text-deep-lilac 3xl:text-2xl text-xl mb-[10px] leading-0">
                        {reportMenuItem.label}
                      </h2>
                      <div className="flex flex-col 3xl:gap-[18px] gap-[calc(18px/6*5)] 3xl:ml-[62px] ml-[calc(62px/6*5)]">
                        {reportMenuItem.items.map((item: any) => {
                          return (
                            <button
                              key={item.id}
                              type="button"
                              className={`3xl:text-sm text-xs transition-all duration-300 hover:opacity-80 text-left ${
                                currentTabId === item.id && "text-deep-lilac"
                              }`}
                              onClick={() => handleClickTab(item.id)}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
          contentChildren={renderList()}
        ></Container>
      </DefaultLayout>
    </CheckAdmin>
  );
}
