import { ReactElement } from "react";

type TabPanelProps = {
  children: ReactElement;
  id: number;
  value: number;
};

export default function TabPanel({ children, id, value }: TabPanelProps) {
  return (
    <>
      <div
        className={`3xl:py-[50px] py-10 overflow-auto scrollbar-none h-[calc(100vh-30px-50px/6*5)] animate-slip-to-top${
          id == value ? "" : " hidden"
        }`}
      >
        {children}
      </div>
    </>
  );
}
