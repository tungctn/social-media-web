import { CustomFlowbiteTheme, Modal } from "flowbite-react";
import Button from "./Button";

type DeleteAlertProps = {
  show: boolean;
  onClose?: () => void;
  onOk?: () => void;
  item: string;
};

export default function DeleteAlert({
  show,
  onClose,
  onOk,
  item,
}: DeleteAlertProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      position={"top-center"}
      theme={customModalTheme}
    >
      <Modal.Body>
        <div className="3xl:text-xl text-lg font-medium leading-none">
          Are you sure to delete your {item}?
        </div>
        <div className="3xl:mt-[28px] mt-[calc(28px/6*5)] flex flex-row gap-[10px] justify-end">
          <Button
            onClick={onClose}
            customClassName="3xl:!h-[30px] !h-[calc(30px/6*5)] 3xl:!w-[100px] w-[calc(100px/6*5)] 3xl:!rounded-[10px] !rounded-[calc(10px/6*5)] 3xl:!text-[14px] !text-[calc(14px/6*5)] !bg-white !text-deep-lilac"
          >
            Cancel
          </Button>
          <Button
            onClick={onOk}
            customClassName="3xl:!h-[30px] !h-[calc(30px/6*5)] 3xl:!w-[100px] w-[calc(100px/6*5)] 3xl:!rounded-[10px] !rounded-[calc(10px/6*5)] 3xl:!text-[14px] !text-[calc(14px/6*5)]"
          >
            OK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const customModalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    base: "relative h-full w-fit 3xl:p-10 p-[calc(40px/6*5)] md:h-auto",
    inner:
      "relative 3xl:rounded-[30px] rounded-[calc(30px/6*5)] bg-white shadow flex flex-col max-h-[90vh]",
  },
};
