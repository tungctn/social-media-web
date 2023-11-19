type StatisticalCardProps = {
  title: string;
  count: number;
  icon: any;
};

export default function StatisticalCard({
  title,
  count,
  icon,
}: StatisticalCardProps) {
  return (
    <div className="bg-white rounded-[10px] 3xl:pl-[35px] pl-[calc(35px*0.75)] pb-3 pt-5 flex flex-row 3xl:gap-[38px] gap-[calc(38px*0.75)] items-center">
      <div className="3xl:text-[40px] text-[calc(40px/6*5)] leading-none">
        {icon}
      </div>
      <div className="flex flex-col gap-3">
        <span className="3xl:text-xl text-base leading-none">{title}</span>
        <span className="3xl:text-[56px] text-5xl leading-none">{count}</span>
      </div>
    </div>
  );
}
