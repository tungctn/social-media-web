"use client";

import MergeTypes from "@/utils/mergeTypes";
import { InputProps } from "./Input";
import DatePicker from "./DatePicker";
import { useEffect, useState } from "react";

type ProfileFieldProps = MergeTypes<
  InputProps,
  {
    options?: {
      label: string;
      value: number;
    }[];
    customInputClassName?: string;
    setValue?: any;
    watch?: any;
  }
>;

export default function ProfileField({
  title = "",
  placeholder = "",
  type = "text",
  error,
  register,
  rules,
  name,
  options,
  customInputClassName = "",
  setValue,
  watch,
}: ProfileFieldProps) {
  const [defaultValue, setDefaultValue] = useState(watch);

  useEffect(() => {
    setDefaultValue(watch);
  }, [watch]);

  return (
    <div className="w-full">
      <label title={title} className={"flex flex-col 3xl:gap-3 gap-1 w-full"}>
        <div className="3xl:text-xl text-lg font-medium">{title}</div>
        {type === "radio" ? (
          <div className="flex flex-row 3xl:gap-5 gap-4 3xl:mt-[15px] mt-[calc(15px/6*5)]">
            {options?.map((option: any) => {
              const isChecked = defaultValue == option.value;
              return (
                <label
                  key={option.value}
                  className="font-medium text-[14px] flex flex-row gap-[9px] items-center"
                >
                  <input
                    type={type}
                    {...register(name, rules)}
                    className="text-deep-lilac focus:ring-deep-lilac border-0 bg-light-silver"
                    value={option.value}
                    checked={isChecked}
                    onChange={() => {
                      setValue(name, option.value);
                    }}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        ) : type === "textarea" ? (
          <textarea
            {...register(name, rules)}
            placeholder={placeholder}
            className={`3xl:rounded-[10px] rounded-[calc(10px/6*5)] 3xl:h-[185px] h-[calc(185px/6*5)] bg-light-silver border-0 px-4 autofill:bg-light-silver focus:ring-deep-lilac focus:outline-none focus:border-0 3xl:w-[240px] w-[calc(240px*0.75)] ${
              error ? " !ring !ring-red-600/50" : ""
            } ${customInputClassName}`}
          />
        ) : type === "date" ? (
          <DatePicker
            title="Birthday"
            register={register}
            name={name}
            setValue={setValue}
            defaultDate={defaultValue}
          />
        ) : (
          <input
            type={type}
            {...register(name, rules)}
            placeholder={placeholder}
            className={`3xl:rounded-[10px] rounded-[calc(10px/6*5)] 3xl:h-[60px] h-[calc(60px/6*5)] bg-light-silver border-0 px-4 autofill:bg-light-silver focus:ring-deep-lilac focus:outline-none focus:border-0 3xl:w-[240px] w-[calc(240px*0.75)] ${
              error ? " !ring !ring-red-600/50" : ""
            } ${customInputClassName}`}
          />
        )}
      </label>
      {error && <p className="text-red-600 ml-2 mt-1">{error}</p>}
    </div>
  );
}
