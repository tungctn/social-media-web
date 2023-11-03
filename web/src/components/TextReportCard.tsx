import User from "@/utils/fakeData/User";
import Avatar from "./Avatar";
import Button from "./Button";
import { Modal } from "flowbite-react";
import { useState } from "react";

type TextReportCardProps = {
  user: User;
  text: string;
  report_id: number;
};

export default function TextReportCard({
  user,
  text,
  report_id,
}: TextReportCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleSeeMore = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div className="w-full flex flex-row 3xl:gap-3 gap-2 bg-white 3xl:h-[160px] h-[calc(160px/5*4)] 3xl:rounded-[10px] rounded-[calc(10px*0.75)] py-3 pl-[14px] pr-5">
        <div className="min-w-fit">
          <Avatar size={40} src={user.avatar_url} />
        </div>
        <div className="relative w-full">
          <span className="3xl:text-[14px] text-[calc(14px/6*5)] leading-none mb-[10px]">
            {user.full_name}
          </span>
          <p className="3xl:text-xs text-[calc(12px/6*5)] py-[10px] 3xl:pl-4 px-3 rounded-[10px] bg-lavender w-full leading-none">
            {text.length > 160 ? (
              <>
                <span className="line-clamp-2">{text}</span>
                <span
                  className="italic text-deep-lilac cursor-pointer"
                  onClick={handleSeeMore}
                >
                  See more
                </span>
              </>
            ) : (
              text
            )}
          </p>
          <div className="flex flex-row 3xl:gap-10 gap-[calc(40px*0.75)] absolute bottom-0 w-full">
            <Button customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] 3xl:!w-[174px] !w-[calc(174px*0.75)] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs">
              Vi phạm
            </Button>
            <Button customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] 3xl:!w-[174px] !w-[calc(174px*0.75)] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs">
              Không vi phạm
            </Button>
          </div>
        </div>
      </div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="flex flex-row gap-4">
            <div className="min-w-fit">
              <Avatar size={60} src={user.avatar_url} />
            </div>
            <div>
              <span className="3xl:text-2xl text-[calc(24px/6*5)] leading-none mt-2 mb-5 block font-medium">
                {user.full_name}
              </span>
              <p className="3xl:text-lg text-base py-[10px] 3xl:pl-4 px-3 rounded-[10px] bg-lavender w-full">
                {text}
              </p>
              <div className="flex flex-row 3xl:gap-10 gap-[calc(40px*0.75)] w-full mt-4">
                <Button customClassName="3xl:!h-[48px] !h-[calc(48px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-sm">
                  Vi phạm
                </Button>
                <Button customClassName="3xl:!h-[48px] !h-[calc(48px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-sm">
                  Không vi phạm
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
