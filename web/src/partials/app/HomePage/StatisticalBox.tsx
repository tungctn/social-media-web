import { PiCellSignalFull } from "react-icons/pi";
import { FaFile, FaFlag, FaUsersLine } from "react-icons/fa6";
import StatisticalCard from "@/components/StatisticalCard";

const statisticalItems: any = [
  {
    title: "Số người dùng đang online",
    count: 415,
    icon: <PiCellSignalFull />,
  },
  {
    title: "Tổng số người dùng hiện tại",
    count: 415,
    icon: <FaUsersLine />,
  },
  {
    title: "Tổng số bài post hôm nay",
    count: 415,
    icon: <FaFile />,
  },
  {
    title: "Tổng số report hôm nay",
    count: 415,
    icon: <FaFlag />,
  },
];

export default function StatisticalBox() {
  return (
    <div className="bg-deep-lilac 3xl:p-10 p-[calc(40px*0.75)] rounded-[20px] shadow-custom 3xl:w-[491px] w-[calc(491px*0.75)] flex flex-col 3xl:gap-6 gap-[calc(24px*0.75)]">
      {statisticalItems.map((item: any) => {
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
