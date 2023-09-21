import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  customClassName?: string;
};

export default function Button({
  children,
  type = "button",
  customClassName,
}: ButtonProps) {
  return (
    <button
      title={"button"}
      className={`h-[57px] bg-deep-lilac rounded-[20px] font-bold text-white px-2 w-full min-w-[57px] border border-deep-lilac text-xl hover:opacity-80 transition duration-300 ease${
        customClassName && ` ${customClassName}`
      }`}
      type={type}
    >
      {children}
    </button>
  );
}
