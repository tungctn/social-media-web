import { ReactNode, MouseEventHandler } from "react";

type TabProps = {
  prefixIcon?: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function Tab({
  prefixIcon,
  label,
  isActive = false,
  onClick,
}: TabProps) {
  return (
    <div
      className={`cursor-pointer w-full h-[52px] py-[6px] px-[6px] flex items-center font-medium rounded-s-[10px] text-xl${
        isActive
          ? " bg-cultured text-deep-lilac"
          : " bg-white text-spanish-gray"
      }`}
      onClick={onClick}
    >
      <div className="bg-white flex items-center px-[11px] gap-[10px] h-full w-full rounded-[8px]">
        {prefixIcon && <div>{prefixIcon}</div>}
        <span>{label}</span>
      </div>
    </div>
  );
}
