import User from "@/utils/fakeData/User";
import Avatar from "./Avatar";
import Button from "./Button";
import { Modal } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import {
  ReportErrorType,
  ReportType,
  getReportErrorSpec,
} from "@/constants/Others";
import { updateStatusReportedPost } from "@/services/postService";
import { updateStatusReportedComment } from "@/services/commentServices";

type TextReportCardProps = {
  user: User;
  text: string;
  id: number;
  type: ReportType;
  status: number;
  errorList: string;
  onChange?: Function;
};

export default function TextReportCard({
  user,
  text,
  id,
  type,
  status = 2,
  errorList,
  onChange = () => {},
}: TextReportCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleSeeMore = () => {
    setOpenModal(true);
  };
  const [nowState, setNowState] = useState<{
    status: number;
    errorList: any[] | null;
  }>({
    status: 2,
    errorList: null,
  });
  const getErrorNodes = useCallback(() => {
    return nowState.errorList?.map((error: any, index) => {
      if (error % 2 && nowState.errorList) {
        const e = getReportErrorSpec(error);
        return (
          <span key={index}>
            {e ? e.label : ""}
            {index !== nowState.errorList.length - 1 && ", "}
          </span>
        );
      }
    });
  }, [nowState.errorList]);

  useEffect(() => {
    setNowState({
      status,
      errorList: errorList ? Array.from(new Set(JSON.parse(errorList))) : null,
    });
  }, [status, errorList]);

  useEffect(() => {
    onChange();
  }, [nowState]);

  const handleAcceptOrRefuse = async (currentStatus: number) => {
    const data = {
      status: currentStatus,
      error_list:
        currentStatus === 3
          ? JSON.stringify([ReportErrorType.ContentNotStardard])
          : null,
    };

    switch (type) {
      case ReportType.post:
        const res: any = await updateStatusReportedPost(id, data);
        if (res.success) {
          setNowState({
            status: currentStatus,
            errorList: data.error_list
              ? JSON.parse(data.error_list)
              : data.error_list,
          });
        }
        break;
      case ReportType.comment:
        const commentRes: any = await updateStatusReportedComment(id, data);
        if (commentRes.success) {
          setNowState({
            status: currentStatus,
            errorList: data.error_list
              ? JSON.parse(data.error_list)
              : data.error_list,
          });
        }
        break;
      default:
        break;
    }
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
            {nowState.status === 2 ? (
              <>
                <Button
                  onClick={() => handleAcceptOrRefuse(3)}
                  customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] 3xl:!w-[174px] !w-[calc(174px*0.75)] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs"
                >
                  Vi phạm
                </Button>
                <Button
                  onClick={() => handleAcceptOrRefuse(1)}
                  customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] 3xl:!w-[174px] !w-[calc(174px*0.75)] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs"
                >
                  Không vi phạm
                </Button>
              </>
            ) : nowState.status === 3 ? (
              <Button
                disabled={true}
                customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] !w-full !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs"
              >
                <>Vi phạm {getErrorNodes()}</>
              </Button>
            ) : nowState.status === 1 ? (
              <Button
                disabled={true}
                customClassName="3xl:!h-[31px] !h-[calc(31px*0.75)] 3xl:!rounded-[10px] !w-full !rounded-[calc(10px*0.75)] 3xl:!text-base !text-xs"
              >
                Không vi phạm
              </Button>
            ) : (
              <></>
            )}
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
                {nowState.status === 2 ? (
                  <>
                    <Button
                      onClick={() => handleAcceptOrRefuse(3)}
                      customClassName="3xl:!h-[48px] !h-[calc(48px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-sm"
                    >
                      Vi phạm
                    </Button>
                    <Button
                      onClick={() => handleAcceptOrRefuse(1)}
                      customClassName="3xl:!h-[48px] !h-[calc(48px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-sm"
                    >
                      Không vi phạm
                    </Button>
                  </>
                ) : nowState.status === 1 ? (
                  <Button customClassName="3xl:!h-[48px] !h-[calc(48px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-sm">
                    Vi phạm {getErrorNodes()}
                  </Button>
                ) : nowState.status === 3 ? (
                  <Button customClassName="3xl:!h-[48px] !h-[calc(48px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-base !text-sm">
                    Vi phạm
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
