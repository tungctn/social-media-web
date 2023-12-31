import { ReactNode, useEffect } from "react";

type ContainerProps = {
  sidebarChildren?: ReactNode;
  contentChildren?: ReactNode;
  children?: ReactNode;
  fixedHeight?: boolean;
  fullScreen?: boolean;
};

export default function Container({
  sidebarChildren,
  contentChildren,
  children,
  fixedHeight = true,
  fullScreen = false,
}: ContainerProps) {
  return (
    <div
      className={
        "flex flex-row bg-cultured rounded-[30px] " +
        (fixedHeight
          ? "3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)] "
          : "") +
        (fullScreen ? "!rounded-e-none" : "3xl:my-10 my-8 3xl:mr-10 mr-8")
      }
    >
      {sidebarChildren && (
        <div className="3xl:min-w-[462px] 3xl:w-[462px] min-w-[calc(462px/6*5)] w-[calc(462px/6*5)] flex flex-col overflow-auto scrollbar-thin scroll-smooth pb-8">
          {sidebarChildren}
        </div>
      )}
      {contentChildren && (
        <div className="rounded-[30px] bg-light-silver w-full shadow-[-28px_0px_20px_-20px_rgba(0,0,0,.5)]">
          {contentChildren}
        </div>
      )}
      {children}
    </div>
  );
}
