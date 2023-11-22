import { getPostTopicData } from "@/utils/fakeData/Post";
import { useMemo } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderProps } from "react-minimal-pie-chart/types/Label";

type CustomPieChartProps = {
  title: string;
  data: any;
};

export default function CustomPieChart({ title, data }: CustomPieChartProps) {
  const chartData = useMemo(() => {
    if (data) {
      delete data["total"];
      return Object.entries(data).map(([key, value]) => {
        const k: any = key;
        const nb: any = value;

        return getPostTopicData(k, nb);
      }).filter(item => item.value !== 0);
    }
    return null;
  }, [data]);

  return (
    <div>
      <h1 className="3xl:text-2xl text-lg font-semibold text-deep-lilac 3xl:mb-[30px] mb-[calc(30px/6*5)]">
        {title}
      </h1>
      <div className="flex flex-row gap-5">
        <div className="3xl:h-[200px] 3xl:w-[200px] h-[200px] w-[200px] 3xl:ml-[80px] ml-[calc(80px/6*5)]">
          {chartData && (
            <PieChart
              data={chartData as any}
              totalValue={data.total}
              animate={true}
              label={({ dataEntry }) => dataEntry.value}
              labelStyle={{
                fontSize: "8px",
              }}
            />
          )}
        </div>
        <div className="flex flex-col gap-3 items-start">
          {chartData?.map((item: any) => {
            if (item) {
              return (
                <div key={item.title} className="flex flex-row gap-[10px]">
                  <span
                    className="h-[14px] w-[32px] rounded-[5px] block"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-xs leading-none">{item.title}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
