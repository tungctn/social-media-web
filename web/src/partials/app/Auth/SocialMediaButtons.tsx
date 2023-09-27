import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

type SocialMediaButtonsProps = {
  hasFacebookLabel?: boolean;
};

export default function SocialMediaButtons({
  hasFacebookLabel = true,
}: SocialMediaButtonsProps) {
  return (
    <>
      <Button customClassName="!bg-white !text-black">
        <div className={`flex gap-5 items-center justify-center`}>
          <span className="3xl:text-[33px] text-[calc(33px/6*5)]">
            <FcGoogle />
          </span>
          <span>Sign in with Google</span>
        </div>
      </Button>
      <Button
        customClassName={`!bg-white ${
          !hasFacebookLabel ? "3xl:!w-[57px] 2xl:!w-[calc(57px/6*5)]" : ""
        }`}
      >
        <div className={`flex gap-5 items-center justify-center`}>
          <span className="3xl:text-[33px] text-[calc(33px/6*5)]">
            <FaFacebook color="#1877F2" />
          </span>
          {hasFacebookLabel && (
            <span className="text-black">Sign in with Facebook</span>
          )}
        </div>
      </Button>
    </>
  );
}
