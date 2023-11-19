import { formatNumberWithTwoDigits } from "@/utils/formatNumber";
import { Tooltip } from "flowbite-react";
import { createElement, useCallback, useMemo } from "react";

type ColumnChartProps = {
  title: string;
  data: any;
};

export default function ColumnChart({ title, data }: ColumnChartProps) {
  const maxValue = useMemo(() => {
    const max = Math.max(...(Object.values(data) as number[]));
    if (max < 10) {
      return 10;
    }

    if (max < 100) {
      return 100;
    }

    if (max > 100) {
      const maxStr = String(max);
      let digitsLength = maxStr.length;
      let i = 1;
      while (digitsLength > 0) {
        i *= 10;
        digitsLength -= 1;
      }
      return Math.floor(max / i) * i;
    }
  }, [data]);

  const renderY = useCallback(() => {
    if (maxValue) {
      const nodes = [];
      for (let index = maxValue; index >= 0; index -= maxValue / 5) {
        const div = createElement("div", { key: index }, index);
        nodes.push(div);
      }

      return nodes;
    }
    return null;
  }, [maxValue]);
  return (
    <div className="bg-white rounded-[20px] shadow-custom 3xl:pt-8 pt-6 3xl:pl-10 pl-8 3xl:pr-[54px] pr-[calc(54px*0.75)] 3xl:pb-[50px] pb-[calc(50px*0.75)]">
      <div className="flex flex-row justify-between items-center 3xl:mb-[46px] mb-[calc(46px*0.75)]">
        <h1 className="text-deep-lilac text-2xl font-semibold">{title}</h1>
      </div>
      <div className="3xl:ml-[22px] ml-[calc(22px*0.75)]">
        <div className="h-[276px] flex flex-row 3xl:gap-[22px] gap-[calc(22px*0.75)]">
          <div className="text-[14px] h-full flex flex-col justify-between text-end">
            {renderY()}
          </div>
          <div className="w-full text-[14px] pb-[28px]">
            <div className="flex flex-row justify-between">
              {Object.entries(data).map(([key, value]) => {
                let height = "0px";
                if (typeof value === "number" && maxValue) {
                  height = (value / maxValue) * 256 + "px";
                }

                return (
                  <div
                    key={key}
                    className="flex flex-col items-center 3xl:gap-[22px] gap-[calc(22px*0.75)]"
                  >
                    <div className="h-[256px] flex flex-row items-end">
                      <Tooltip content={String(value)} style="light">
                        <div
                          className="w-9 bg-deep-lilac"
                          style={{
                            height,
                          }}
                        ></div>
                      </Tooltip>
                    </div>
                    <div>{formatNumberWithTwoDigits(Number(key))}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
