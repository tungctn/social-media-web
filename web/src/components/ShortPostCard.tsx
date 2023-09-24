import Image from "next/image";

type ShortPostCardProps = {
  images: string[];
};

export default function ShortPostCard({ images }: ShortPostCardProps) {
  return (
    <div>
      <Image
        src={images[0]}
        alt=""
        width={267}
        height={267}
        className="3xl:w-[267px] 2xl:w-[calc(267px/6*5)] 3xl:h-[267px] 2xl:h-[calc(267px/6*5)] rounded-[10px] object-cover border-[1.5px] border-deep-lilac"
      />
    </div>
  );
}
