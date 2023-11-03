import { ReactNode, MouseEventHandler } from "react";

type MenuItemProps = {
  prefixIcon?: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function MenuItem({
  prefixIcon,
  label,
  isActive = false,
  onClick,
}: MenuItemProps) {
  return (
    <div
      className={`cursor-pointer w-full h-[52px] py-[6px] px-[6px] flex items-center font-medium rounded-s-[10px] 3xl:text-xl text-base ${
        isActive
          ? " bg-cultured text-deep-lilac"
          : " bg-white text-spanish-gray"
      }`}
      onClick={onClick}
    >
      <div className="bg-white flex items-center px-[11px] gap-[10px] h-full w-full rounded-[8px]">
        {prefixIcon && (
          <div className="3xl:text-[30px] text-[calc(30px/6*5)]">{prefixIcon}</div>
        )}
        <span>{label}</span>
      </div>
    </div>
  );
}
