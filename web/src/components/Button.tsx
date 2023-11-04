import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  customClassName?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
};

export default function Button({
  children,
  type = "button",
  customClassName,
  disabled = false,
  onClick,
  title = "title",
}: ButtonProps) {
  return (
    <button
      title={title}
      className={`3xl:h-[57px] h-[calc(57px/6*5)] 3xl:min-w-[57px] min-w-[calc(57px/6*5)] 3xl:rounded-[20px] rounded-[calc(20px/6*5)] font-bold text-white px-2 w-full border leading-none border-deep-lilac 3xl:text-xl text-lg transition duration-300 ease ${
        customClassName && ` ${customClassName}`
      } ${disabled ? "bg-lenurple" : "bg-deep-lilac hover:opacity-80"}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
