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
      className={`cursor-pointer w-full h-[52px] py-[6px] px-[6px] flex items-center font-medium rounded-s-[10px] 3xl:text-xl text-lg${
        isActive
          ? " bg-cultured text-deep-lilac"
          : " bg-white text-spanish-gray"
      }`}
      onClick={onClick}
    >
      <div className="bg-white flex items-center px-[11px] gap-[10px] h-full w-full rounded-[8px]">
        {prefixIcon && (
          <div className="3xl:text-[30px] text-[25px]">{prefixIcon}</div>
        )}
        <span>{label}</span>
      </div>
    </div>
  );
}
