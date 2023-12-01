import { CustomFlowbiteTheme, Modal, Radio } from "flowbite-react";
import { FormEventHandler } from "react";
import Button from "./Button";

type ReportFormModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function ReportFormModal({
  show,
  onClose,
  onSubmit,
}: ReportFormModalProps) {
  return (
    <Modal show={show} onClose={onClose} dismissible={true}>
      <Modal.Header>
        Select type of violation
        <p className="text-base font-normal">
          Please select a type of violation. If the article violates both,
          please choose the one that violates the most.
        </p>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-5 mb-4">
            <label className="flex flex-row gap-2 items-center">
              <Radio value={1} name="type_report" theme={customRadioTheme} />
              Content
            </label>
            <label className="flex flex-row gap-2 items-center">
              <Radio value={2} name="type_report" theme={customRadioTheme} />
              Image
            </label>
          </div>
          <Button type="submit">Report</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const customRadioTheme: CustomFlowbiteTheme["radio"] = {
  root: {
    base: "h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-deep-lilac dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-deep-lilac dark:focus:ring-deep-lilac text-deep-lilac",
  },
};
