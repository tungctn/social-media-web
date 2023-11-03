import { Image as ImageType } from "@/utils/fakeData/Image";
import Button from "./Button";
import Image from "next/image";

type ImageReportCardProps = {
  full_name: string;
  report_id: number;
  images: ImageType[];
};

export default function ImageReportCard({
  full_name,
  report_id,
  images,
}: ImageReportCardProps) {
  return (
    <div className="3xl:w-[240px] 3xl:h-[300px] w-[calc(240px*0.75)] h-[calc(300px*0.75)] bg-white 3xl:rounded-[20px] rounded-[calc(20px*0.75)] 3xl:px-5 px-4 3xl:py-4 py-3">
      <div className="w-full 3xl:h-[152px] h-[calc(152px*0.75)] bg-light-silver 3xl:rounded-[20px] rounded-[calc(20px*0.75)]"></div>
      <div className="w-full flex flex-col items-center">
        <span className="font-bold leading-none 3xl:my-3 my-2 text-center">
          {full_name}
        </span>
        <div className="flex flex-col 3xl:gap-3 gap-2 w-full">
          <Button customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs">
            Vi phạm
          </Button>
          <Button customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs">
            Không vi phạm
          </Button>
        </div>
      </div>
    </div>
  );
}
