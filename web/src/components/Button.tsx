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
      className={`3xl:h-[57px] 2xl:h-[calc(57px/6*5)] 3xl:min-w-[57px] 2xl:min-w-[calc(57px/6*5)] bg-deep-lilac 3xl:rounded-[20px] 2xl:rounded-[calc(20px/6*5)] font-bold text-white px-2 w-full border border-deep-lilac text-xl hover:opacity-80 transition duration-300 ease${
        customClassName && ` ${customClassName}`
      }`}
      type={type}
    >
      {children}
    </button>
  );
}
