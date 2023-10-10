"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel?: string;
  header?: React.ReactElement;
  isButtonClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  header,
  isButtonClose,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit?.();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    isOpen && (
      <div
        className="
            justify-center 
            flex 
            overflow-x-hidden 
            overflow-y-auto
            fixed 
            inset-0 
            z-50 
            outline-none 
            focus:outline-none
          bg-neutral-800/70
            font-clash
            
        "
        onClick={handleClose}
      >
        <div
          className="
              relative 
              w-full
              md:w-4/6
              lg:w-4/6
              xl:w-5/12
              my-6
              mx-auto 
              h-auto
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div
            className={`
                translate
                duration-300
                min-h-full
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}
                `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-20
                rounded-xl
                shadow-lg 
                relative 
                flex 
                flex-col 
                w-full 
              bg-white 
                outline-none 
                focus:outline-none
              "
            >
              {/*header*/}
              <div
                className="
                  flex 
                  items-center 
                  p-6
                  rounded-t-xl
                  justify-center
                  relative
                  border-b-[1px]
                  text-beige
                  border-deep-lilac
              "
              >
                {!isButtonClose && (
                  <button
                    className="
                      p-1
                      border-0
                      hover:opacity-70
                      transition
                      absolute
                      right-9
                  "
                    onClick={handleClose}
                  >
                    <IoMdClose size={28} color="#9551BA" className="stroke-2" />
                  </button>
                )}
                {header}
                <div className="text-xl font-semibold text-deep-lilac">
                  {title}
                </div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{body}</div>
              {/*footer*/}
              {!isButtonClose && (
                <div className="flex flex-col gap-2 p-6">
                  <div
                    className="
                      flex 
                      flex-row 
                      items-center 
                      gap-4 
                      w-full
                  "
                  >
                    <Button
                      customClassName="bg-lavender border-none"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <p className="text-spanish-gray">{actionLabel}</p>
                    </Button>
                  </div>
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
