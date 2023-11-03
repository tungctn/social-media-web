import useComponentVisible from "@/hooks/useComponentVisible";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const actions: any = {
  "-1": {
    id: -1,
    textLabel: "Following",
    inputLabel: "Unfollow",
  },
  "1": {
    id: 1,
    textLabel: "Follow",
    inputLabel: "Follow",
  },
  "2": {
    id: 2,
    textLabel: "Follow",
    inputLabel: "Block",
  },
  "-2": {
    id: -2,
    textLabel: "Blocked",
    inputLabel: "Unblock",
  },
};

export default function FollowingButton() {
  const [currentActionId, setCurrentActionId] = useState(1);
  const [currentActions, setCurrentActions] = useState(
    Object.values(actions).filter((action: any) => action.id > 0),
  );
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {}, []);

  const handleTrigger = () => {
    if (isComponentVisible) {
      setIsComponentVisible(false);
    } else {
      setIsComponentVisible(true);
    }
  };

  const handleClose = (id: number) => {
    let a: any = [];
    switch (id) {
      case -1:
        a = [actions[1], actions[2]];
        break;
      case 1:
        a = [actions[-1], actions[2]];
        break;
      case 2:
        a = [actions[1], actions[-2]];
        break;
      case -2:
        a = [actions[1], actions[2]];
        break;
      default:
        break;
    }
    setCurrentActionId(-id);
    setCurrentActions(a);
    setIsComponentVisible(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleTrigger}
        type="button"
        title="following"
        className="text-deep-lilac rounded-[5px] bg-white h-10 3xl:w-[157px] w-[calc(157px/6*5)] flex flex-row items-center text-[14px] border border-deep-lilac"
      >
        <span className="w-full">{actions[currentActionId].textLabel}</span>
        <span className="pr-[11.45px]">
          <FaChevronDown />
        </span>
      </button>
      <div
        ref={ref}
        className={`bg-white rounded-md 3xl:text-base text-xs px-4 py-2 absolute 3xl:w-[157px] w-[calc(157px/6*5)] ${
          isComponentVisible ? "" : "hidden"
        }`}
      >
        {currentActions?.map((currentAction: any, index) => {
          return (
            <button
              title={currentAction.inputLabel}
              key={index}
              type="button"
              className={`block py-1 border-lavender border-b-[1px] last:border-b-0 border-solid w-full text-left ${
                currentAction.id == 2 ? "text-vivid-red" : ""
              }`}
              onClick={() => handleClose(currentAction.id)}
            >
              {currentAction.inputLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
