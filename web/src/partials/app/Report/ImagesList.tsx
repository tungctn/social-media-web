import ImageReportCard from "@/components/ImageReportCard";
import { BREAKPOINTS } from "@/constants/WindowSizes";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useEffect, useRef } from "react";

type ImagesListProps = {
  data: any
}

export default function ImagesList({ data }: ImagesListProps) {
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
        return (
          <ImageReportCard
            key={item.user.user_id}
            user={item.user}
            reportId={1}
            images={item.images}
            reportedAt={new Date()}
          />
        );
      })}
    </div>
  );
}
