import AuthLayout from "@/layouts/AuthLayout";
import maleImage from "@/assets/imgs/male-cat.png";
import Link from "next/link";
import Input from "@/components/Input";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";

export default function SignUp() {
  return (
    <AuthLayout img={maleImage}>
      <form className="flex flex-col gap-[30px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-4xl">Sign up</h1>
          <span className="flex items-baseline gap-1">
            <span>Already have account?</span>
            <Link
              href={"/sign-in"}
              className="font-bold text-xl text-deep-lilac"
            >
              Sign in
            </Link>
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-5">
            <Input name="username" title="Username" />
            <Input name="email" type="email" title="Email" />
            <Input name="password" type="password" title="Password" />
          </div>
          <div className="flex flex-col gap-6 text-xs">
            <div className="ml-2">
              <Checkbox
                label={
                  <>
                    By creating an account, you agree with{" "}
                    <Link href={"/"} className="text-deep-lilac">
                      Term of service
                    </Link>{" "}
                    and{" "}
                    <Link href={"/"} className="text-deep-lilac">
                      Privacy policy
                    </Link>
                  </>
                }
              />
            </div>
            <Button type="submit">Sign up</Button>
          </div>
        </div>
      </form>
      <div className="mt-[48px]"></div>
      <Divider>Or</Divider>
      <div className="mb-[30px]"></div>
      <div className="flex flex-row gap-3">
        <Button customClassName="!bg-white !text-black">
          <div className="flex gap-5 items-center justify-center">
            <Icon name="google" />
            <span>Sign in with Google</span>
          </div>
        </Button>
        <Button customClassName="!bg-white !w-[57px]">
          <div className="flex gap-5 items-center justify-center">
            <Icon name="facebook" />
          </div>
        </Button>
      </div>
    </AuthLayout>
  );
}
