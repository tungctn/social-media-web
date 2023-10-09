import { CustomFlowbiteTheme, Datepicker } from "flowbite-react";
import { InputProps } from "./Input";
import MergeTypes from "@/utils/mergeTypes";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { FaCalendar } from "react-icons/fa6";
import useComponentVisible from "@/hooks/useComponentVisible";

type DatePickerProps = MergeTypes<
  InputProps,
  {
    setValue?: any;
    defaultDate: string;
  }
>;

export default function DatePicker({
  error,
  register,
  rules,
  name,
  setValue,
  defaultDate,
}: DatePickerProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    defaultDate && setDate(new Date(defaultDate));
  }, [defaultDate]);

  const handleFocusDateInput = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleChangeDate = (newDate: any) => {
    setDate(newDate);
    setValue(name, dayjs(newDate).format("YYYY-MM-DD"));
  };

  const renderCalendar = useCallback(() => {
    return (
      date &&
      defaultDate && (
        <div
          ref={ref}
          className={"absolute z-20 " + (isComponentVisible ? "" : "hidden")}
        >
          <Datepicker
            onSelectedDateChanged={handleChangeDate}
            theme={customDatePickerTheme}
            inline
            autoHide={false}
            defaultDate={new Date(defaultDate)}
          />
        </div>
      )
    );
  }, [isComponentVisible, date]);

  return (
    <>
      <div className="relative">
        <div>
          <div
            className={`z-20 cursor-pointer relative flex flex-row items-center 3xl:rounded-[10px] rounded-[calc(10px/6*5)] 3xl:h-[60px] h-[calc(60px/6*5)] bg-light-silver border-0 px-4 3xl:w-[240px] w-[calc(240px*0.75)] ${
              error ? " !ring !ring-red-600/50" : ""
            } ${isComponentVisible ? "ring-1 ring-deep-lilac" : ""}`}
          >
            <input
              {...register(name, rules)}
              value={dayjs(date).format("DD/MM/YYYY")}
              className={
                "bg-transparent border-0 focus:ring-0 w-full h-full px-0 py-0"
              }
              onClick={handleFocusDateInput}
              readOnly
            />
            <FaCalendar />
          </div>
        </div>
        {renderCalendar()}
      </div>
    </>
  );
}

const customDatePickerTheme: CustomFlowbiteTheme["datepicker"] = {
  popup: {
    root: {
      base: "absolute 3xl:top-[60px+4px] top-[calc(60px/6*5+4px)] z-50 block pt-2",
    },
    footer: {
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-deep-lilac",
        today: "bg-deep-lilac text-white hover:bg-deep-lilac/80",
      },
    },
  },
  views: {
    days: {
      items: {
        item: {
          selected: "bg-deep-lilac text-white hover:bg-deep-lilac/80",
        },
      },
    },
    months: {
      items: {
        item: {
          selected: "bg-deep-lilac text-white hover:bg-deep-lilac/80",
        },
      },
    },
    years: {
      items: {
        item: {
          selected: "bg-deep-lilac text-white hover:bg-deep-lilac/80",
        },
      },
    },
    decades: {
      items: {
        item: {
          selected: "bg-deep-lilac text-white hover:bg-deep-lilac/80",
        },
      },
    },
  },
};
