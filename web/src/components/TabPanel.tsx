import { ReactElement } from "react";

type TabPanelProps = {
  children: ReactElement;
  id: number;
  value: number;
};

export default function TabPanel({ children, id, value }: TabPanelProps) {
  return (
    <>
      {id === value && (
        <div
          className={`3xl:py-[50px] py-10 overflow-auto scrollbar-none 3xl:h-[calc(100vh-30px-50px-40px*2)] h-[calc(100vh-30px-50px/6*5-32px*2)] animate-slip-to-top`}
        >
          {children}
        </div>
      )}
    </>
  );
}
