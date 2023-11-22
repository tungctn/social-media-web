"use client";

import { ChartSelectMenu } from "@/constants/DefaultMenu";
import useComponentVisible from "@/hooks/useComponentVisible";
import { useState } from "react";
import { FaAngleDown, FaL } from "react-icons/fa6";

type ChartSelectProps = {
  onChange?: Function;
};

export default function ChartSelect({ onChange = () => {} }: ChartSelectProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [currentOption, setCurrentOption] = useState(ChartSelectMenu[5]);

  const handleClickOption = (item: any) => {
    onChange(item.value);
    setCurrentOption(item);
    setIsComponentVisible(false);
  };
  return (
    <div className="relative text-[14px]">
      <div
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        className="h-[23px] w-[100px] min-w-max cursor-pointer text-deep-lilac bg-white rounded-[5px] border-[0.5px] border-solid border-deep-lilac flex flex-row justify-between items-center pl-3 pr-2 py-1"
      >
        <span className="leading-none min-w-max">{currentOption.label}</span>
        <span className="leading-none">
          <FaAngleDown size={12} />
        </span>
      </div>
      <div
        className="absolute w-fit"
        ref={ref}
        style={{ display: isComponentVisible ? "block" : "none" }}
      >
        <div className="min-w-fit shadow-custom rounded-[20px] py-2 bg-white">
          {ChartSelectMenu.map((item: any) => {
            return (
              <button
                className={
                  "min-w-max w-full px-3 py-1 border-solid border-light-silver border-b-[1px] last:border-b-0 transition hover:opacity-75 " +
                  (currentOption.value === item.value ? "text-deep-lilac" : "")
                }
                key={item.value}
                onClick={() => handleClickOption(item)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
