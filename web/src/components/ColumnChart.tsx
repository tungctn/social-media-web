import {
  formatDate,
  formatDateOfMonth,
  formatNumberWithTwoDigits,
} from "@/utils/formatX";
import { Tooltip } from "flowbite-react";
import { createElement, useCallback, useMemo } from "react";
import ChartSelect from "./ChartSelect";
import { injectStyle } from "@/utils/styles";

type ColumnChartProps = {
  title: string;
  data: any;
  onChangeTime: Function;
  columnWidth?: number;
};

export default function ColumnChart({
  title,
  data,
  onChangeTime,
  columnWidth = 32,
}: ColumnChartProps) {
  const maxValue = useMemo(() => {
    const max = Math.max(...(Object.values(data) as number[]));
    if (max < 10) {
      return 10;
    }

    if (max > 10) {
      const maxStr = String(max);
      let digitsLength = maxStr.length - 1;
      let i = 1;
      while (digitsLength > 0) {
        i *= 10;
        digitsLength -= 1;
      }
      return Math.ceil(max / i) * i;
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
        <ChartSelect onChange={onChangeTime} />
      </div>
      <div className="3xl:ml-[22px] ml-[calc(22px*0.75)]">
        <div className="h-[276px] flex flex-row 3xl:gap-[22px] gap-[calc(22px*0.75)]">
          <div className="text-[14px] h-full flex flex-col justify-between text-end">
            {renderY()}
          </div>
          <div className="w-full text-[14px] pb-[28px]">
            <div className="flex flex-row justify-between">
              {Object.entries(data).map(([key, value]) => {
                const isDate = key.match(new RegExp(/\d{4}[-]\d{2}[-]\d{2}/g));
                const isNumber = key.match(new RegExp(/^\d+$/g));
                const isBigger15 = Object.entries(data).length > 15;

                let height = "0px";
                if (typeof value === "number" && maxValue) {
                  height = (value / maxValue) * 256 + "px";
                }
                const keyframesStyle = `
                  @-webkit-keyframes rise-${value} {
                    0% {
                      height: 0px;
                    }
                    100% {
                      height: ${height};
                    }
                  }
                `;
                injectStyle(keyframesStyle);
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center 3xl:gap-[22px] gap-[calc(22px*0.75)]"
                  >
                    <div className="h-[256px] flex flex-row items-end">
                      <Tooltip content={String(value)} style="light">
                        <div
                          className="bg-deep-lilac"
                          style={{
                            width: isBigger15 ? columnWidth / 2 : columnWidth,
                            height,
                            animationName: `rise-${value}`,
                            animationDuration: "400ms",
                            animationTimingFunction: "linear",
                            animationIterationCount: 1,
                          }}
                        ></div>
                      </Tooltip>
                    </div>
                    <div
                      className="break-keep"
                      style={{
                        maxWidth: isBigger15 ? "20px" : "inherit",
                        fontSize: isBigger15 ? "10px" : "inherit",
                      }}
                    >
                      {isDate
                        ? isBigger15
                          ? formatDateOfMonth(key)
                          : formatDate(key)
                        : isNumber
                        ? formatNumberWithTwoDigits(Number(key))
                        : key}
                    </div>
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
