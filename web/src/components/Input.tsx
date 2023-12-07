import IFormValues from "@/constants/IFormValues";
import { useState } from "react";
import { UseFormRegister, Validate } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export type InputProps = {
  title: string;
  placeholder?: string;
  name:
    | "first_name"
    | "last_name"
    | "password"
    | "email"
    | "repassword"
    | "gender"
    | "date_of_birth"
    | "address"
    | "bio"
    | "old_password";
  type?: string;
  error?: string | undefined;
  register: UseFormRegister<IFormValues>;
  rules?: any;
  readonly?: boolean;
};

export default function Input({
  title = "",
  placeholder = "",
  type = "text",
  error,
  register,
  rules,
  name,
  readonly = false,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label title={title} className="flex flex-col 3xl:gap-3 gap-1 w-full">
        <div className="3xl:text-xl text-lg font-bold ml-[7px]">{title}</div>
        <div className="relative">
          <input
            type={type === "password" ? (!showPassword ? type : "text") : type}
            {...register(name, rules)}
            placeholder={placeholder}
            className={`3xl:rounded-[20px] rounded-[calc(20px/6*5)] 3xl:h-[57px] h-[calc(57px/6*5)] w-full bg-light-silver border-0 px-4 autofill:bg-light-silver focus:ring-deep-lilac focus:outline-none focus:border-0 ${
              error && " !ring !ring-red-600/50"
            }`}
            readOnly={readonly}
          />
          {type === "password" && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>
      </label>
      {error && <p className="text-red-600 ml-2 mt-1">{error}</p>}
    </div>
  );
}
