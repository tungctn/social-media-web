import IFormValues from "@/constants/IFormValues";
import { UseFormRegister, Validate } from "react-hook-form";

type InputProps = {
  title: string;
  placeholder?: string;
  name: "username" | "password" | "email" | "repassword";
  type?: string;
  error?: string | undefined;
  register: UseFormRegister<IFormValues>;
  rules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?:
      | Validate<string, IFormValues>
      | Record<string, Validate<string, IFormValues>>;
  };
};

export default function Input({
  title = "",
  placeholder = "",
  type = "text",
  error,
  register,
  rules,
  name,
}: InputProps) {
  return (
    <div>
      <label title={title} className="flex flex-col gap-3">
        <div className="text-xl font-bold">{title}</div>
        <input
          type={type}
          {...register(name, rules)}
          placeholder={placeholder}
          className={`rounded-[20px] h-[57px] bg-light-silver border-0 px-4 autofill:bg-light-silver focus:ring-deep-lilac focus:outline-none focus:border-0${
            error && " !ring !ring-red-600/50"
          }`}
        />
      </label>
      {error && <p className="text-red-600 ml-2 mt-1">{error}</p>}
    </div>
  );
}