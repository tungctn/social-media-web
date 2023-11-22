import { PiCellSignalFull } from "react-icons/pi";
import { FaFile, FaFlag, FaUsersLine } from "react-icons/fa6";
import StatisticalCard from "@/components/StatisticalCard";
import { useEffect, useMemo, useState } from "react";
import { getStatisticalNumber } from "@/services/adminServices";

const statisticalItems: any = [
  {
    title: "Số người dùng đang online",
    count: 415,
    icon: <PiCellSignalFull />,
    alias: "online",
  },
  {
    title: "Tổng số người dùng hiện tại",
    count: 415,
    icon: <FaUsersLine />,
    alias: "user",
  },
  {
    title: "Tổng số bài post hôm nay",
    count: 415,
    icon: <FaFile />,
    alias: "post",
  },
  {
    title: "Tổng số report hôm nay",
    count: 415,
    icon: <FaFlag />,
    alias: "report",
  },
];

export default function StatisticalBox() {
  const [currentStatisticalItems, setCurrentStatisticalItems] = useState<any>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res: any = await getStatisticalNumber();
    if (res.success) {
      const data = res.data.data;
      const newStatisticalItems = statisticalItems.map((item: any) => {
        const newItem = { ...item, count: data[item.alias] };
        return newItem;
      });
      setCurrentStatisticalItems(newStatisticalItems);
    }
  };
  return (
    <div className="bg-deep-lilac 3xl:p-10 p-[calc(40px*0.75)] rounded-[20px] shadow-custom 3xl:w-[491px] w-[calc(491px*0.75)] flex flex-col 3xl:gap-6 gap-[calc(24px*0.75)]">
      {currentStatisticalItems &&
        currentStatisticalItems?.map((item: any) => {
          return (
            <StatisticalCard
              key={item.title}
              title={item.title}
              count={item.count}
              icon={item.icon}
            />
          );
        })}
    </div>
  );
}
