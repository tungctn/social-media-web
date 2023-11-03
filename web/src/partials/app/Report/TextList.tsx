import TextReportCard from "@/components/TextReportCard";

type TextListProps = {
  data: any;
};

export default function TextList({ data }: TextListProps) {
  return (
    <div className="px-6 py-10 overflow-auto scrollbar-none 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)]">
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-5">
        {data?.map((item: any) => {
          return (
            <section key={item.id} className="w-[calc(50%-1rem/2)]">
              <TextReportCard
                user={item.user}
                report_id={1}
                text={item.content}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
