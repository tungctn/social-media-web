"use client";

import { Image as ImageType } from "@/utils/fakeData/Image";
import Button from "./Button";
import Image from "next/image";
import { CustomFlowbiteTheme, Modal } from "flowbite-react";
import { useState } from "react";
import Link from "next/link";
import User from "@/utils/fakeData/User";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import CustomCarousel from "./CustomCarousel";

type ImageReportCardProps = {
  user: User;
  reportId: number;
  images: ImageType[];
  reportedAt: Date;
};

export default function ImageReportCard({
  user,
  reportId,
  images,
  reportedAt,
}: ImageReportCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(true);
  };
  return (
    <>
      <div className="3xl:w-[240px] 3xl:h-[300px] w-[calc(240px*0.75)] h-[calc(300px*0.75)] bg-white 3xl:rounded-[20px] rounded-[calc(20px*0.75)] 3xl:px-5 px-4 3xl:py-4 py-3">
        <div className="w-full relative 3xl:h-[152px] h-[calc(152px*0.75)] bg-light-silver 3xl:rounded-[20px] rounded-[calc(20px*0.75)]">
          <Image
            src={images[0].url}
            alt="violated-img"
            width={200}
            height={152}
            className="w-full h-full object-cover 3xl:rounded-[20px] rounded-[calc(20px*0.75)]"
          />
          {images.length > 1 && (
            <div
              onClick={handleShowDetail}
              className="w-full h-full cursor-pointer font-medium text-white/75 transition-all duration-300 hover:text-white 3xl:rounded-[20px] rounded-[calc(20px*0.75)] bg-black/[0.28] hover:bg-black/40 absolute top-0 left-0 z-10"
            >
              <span className="w-full h-full flex items-center justify-center">
                +{images.length - 1}
              </span>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          <span className="font-bold leading-none 3xl:my-3 my-2 text-center">
            {user.full_name}
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
      <Modal
        dismissible
        show={showDetail}
        size={"2xl"}
        onClose={() => setShowDetail(false)}
        theme={customModalTheme}
      >
        <Modal.Body>
          <div className="h-full flex flex-col">
            <div className="flex flex-row gap-[14px] items-center">
              <Link href={`/profile/${user.user_id}`}>
                <Avatar size={50} src={user.avatar_url} />
              </Link>
              <div className="flex flex-col">
                <Link href={`/profile/${user.user_id}`}>
                  <span className="text-xl text-deep-lilac font-bold">
                    {user.full_name}
                  </span>
                </Link>
                <time className="text-xs text-spanish-gray">
                  Reported at{" "}
                  <span className="first-letter:uppercase">
                    {dayjs(reportedAt).format("dddd, HH:mm DD/MM/YYYY")}
                  </span>
                </time>
              </div>
            </div>
            <div className="3xl:mt-[35px] mt-[calc(35px/6*5)] h-full">
              <CustomCarousel
                images={images}
                customImgClassName="rounded-e-[30px] !h-full !object-contain bg-deep-lilac/40"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="w-full border-e-[1px] border-solid border-light-silver text-deep-lilac">
            Vi phạm
          </button>
          <button className="w-full text-deep-lilac">Không vi phạm</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const customModalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    base: "relative !h-[90vh] w-full p-4 md:h-auto",
    inner:
      "relative rounded-[30px] bg-white shadow dark:bg-gray-700 flex flex-col h-full max-h-[90vh]",
  },
};
