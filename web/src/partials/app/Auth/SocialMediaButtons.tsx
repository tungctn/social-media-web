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
        <div
          className={`flex gap-5 items-center ${
            hasFacebookLabel ? "ml-[166px]" : "justify-center"
          }`}
        >
          <FcGoogle size={33} />
          <span>Sign in with Google</span>
        </div>
      </Button>
      <Button
        customClassName={`!bg-white ${!hasFacebookLabel ? "!w-[57px]" : ""}`}
      >
        <div
          className={`flex gap-5 items-center ${
            hasFacebookLabel ? "ml-[166px]" : "justify-center"
          }`}
        >
          <FaFacebook size={33} color="#1877F2" />
          {hasFacebookLabel && (
            <span className="text-black">Sign in with Facebook</span>
          )}
        </div>
      </Button>
    </>
  );
}
