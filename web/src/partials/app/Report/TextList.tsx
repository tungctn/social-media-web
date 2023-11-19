import TextReportCard from "@/components/TextReportCard";
import { ReportType } from "@/constants/Others";

type TextListProps = {
  data: any;
  type: ReportType;
  onChange?: Function;
};

export default function TextList({
  data,
  type,
  onChange = () => {},
}: TextListProps) {
  return (
    <div className="px-6 py-10 overflow-auto scrollbar-none 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)]">
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-5">
        {data?.map((item: any) => {
          return (
            <section key={item.id} className="w-[calc(50%-1rem/2)]">
              <TextReportCard
                user={item.user}
                id={item.id}
                text={item.content}
                type={type}
                status={item.status}
                errorList={item.error_list}
                onChange={onChange}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
