import { Image as ImageType } from "@/utils/fakeData/Image";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

type CustomCarouselProps = {
  images: ImageType[];
  customImgClassName?: string;
};

export default function CustomCarousel({
  images,
  customImgClassName = "",
}: CustomCarouselProps) {
  return (
    <Carousel
      slide={false}
      indicators={false}
      leftControl={
        images?.length > 1 ? (
          <div className="3xl:text-[50px] text-[calc(50px/4*3)] text-lavender transition-all duration-300 hover:opacity-80">
            <FaCircleChevronLeft />
          </div>
        ) : (
          <></>
        )
      }
      rightControl={
        images?.length > 1 ? (
          <div className="3xl:text-[50px] text-[calc(50px/4*3)] text-lavender transition-all duration-300 hover:opacity-80">
            <FaCircleChevronRight />
          </div>
        ) : (
          <></>
        )
      }
      theme={{
        item: {
          base: "absolute top-1/2 block w-full -translate-y-1/2",
        },
        scrollContainer: {
          base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-0",
        },
      }}
    >
      {images &&
        images.map((image, index) => (
          <Image
            key={index}
            src={image.url}
            alt=""
            width={573}
            height={850}
            className={
              "h-full w-[calc(100%-0.45px)] object-cover rounded-s-[30px] " +
              customImgClassName
            }
          />
        ))}
    </Carousel>
  );
}
