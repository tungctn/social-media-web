import { ReactNode } from "react";

type CheckboxProps = {
  label: ReactNode;
};

export default function Checkbox({ label }: CheckboxProps) {
  return (
    <label className="flex flex-row items-center gap-[5px]">
      <input
        placeholder=""
        type="checkbox"
        title="checkbox"
        className="w-3 h-3 text-deep-lilac bg-white border-black rounded focus:ring-deep-lilac/50 focus:ring-offset-0 focus:ring-[1px]"
      />
      <span>{label}</span>
    </label>
  );
}
