import { ReactNode } from "react";

type DividerProps = {
  children: ReactNode;
};

export default function Divider({ children }: DividerProps) {
  return (
    <div className="flex flex-row items-center gap-[15px]">
      <div className="h-[1px] bg-black w-full"></div>
      <div className="text-xl font-bold min-w-fit">{children}</div>
      <div className="h-[1px] bg-black w-full"></div>
    </div>
  );
}
