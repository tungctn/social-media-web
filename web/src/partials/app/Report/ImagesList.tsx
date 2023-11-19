import ImageReportCard from "@/components/ImageReportCard";
import { ReportType } from "@/constants/Others";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useEffect, useRef } from "react";

type ImagesListProps = {
  data: any;
  type: ReportType;
  onChange?: Function;
};

export default function ImagesList({
  data,
  type,
  onChange = () => {},
}: ImagesListProps) {
  const { width } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      let gap = 16;
      const containerW = ref.current.offsetWidth;
      if (width >= BREAKPOINTS.extraLarge) {
      } else {
        gap = (containerW - 240 * 0.75 * 4) / 3;
      }

      ref.current.style.gap = gap + "px";
    }
  }, [width, ref]);
  return (
    <div
      ref={ref}
      className="mx-5 py-[54px] flex flex-row flex-wrap justify-center overflow-auto scrollbar-none 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)]"
    >
      {data?.map((item: any) => {
        if (item.type_report === 2) {
          return (
            <ImageReportCard
              key={item.id}
              user={item.user}
              id={item.id}
              images={item.images}
              reportedAt={new Date()}
              type={type}
              status={item.status}
              errorList={item.error_list}
              onChange={onChange}
            />
          );
        }
      })}
    </div>
  );
}
