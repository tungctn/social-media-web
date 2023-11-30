import { FaXmark } from "react-icons/fa6";

type OptionsBoxProps = {
  actionsRef: any;
  onClose: any;
  open: boolean;
  options: {
    label: string;
    onClick?: Function;
    danger?: boolean;
  }[];
  topClassName?: string;
};

export default function OptionsBox({
  actionsRef,
  onClose,
  open = false,
  options,
  topClassName = "top-[calc(17px+25px)]",
}: OptionsBoxProps) {
  return (
    <div
      ref={actionsRef}
      tabIndex={-1}
      onBlur={onClose}
      className={`absolute z-40 bg-white rounded-[10px] shadow-[0px_4px_10px_4px_rgba(149,81,186,.24)] -right-[7px] min-w-[169px]${
        !open ? " hidden" : ""
      } ${topClassName}`}
    >
      <div className="relative pt-3 px-4 pb-[6px]">
        <div
          className="text-deep-lilac absolute top-[8px] right-[10px]"
          onClick={onClose}
        >
          <FaXmark />
        </div>
        <div>
          {options?.map((option: any, index) => {
            return (
              <div key={option.label}>
                <button
                  type="button"
                  className={
                    "min-w-fit py-3 font-medium " +
                    (option.danger ? "text-vivid-red" : "")
                  }
                  onClick={option.onClick ? option.onClick : () => {}}
                >
                  {option.label}
                </button>
                {index !== options.length - 1 && (
                  <div className="h-[1px] w-full bg-lavender"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
