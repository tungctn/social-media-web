import AuthLayout from "@/layouts/AuthLayout";
import femaleCatImg from "@/assets/imgs/female-cat.png";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Link from "next/link";
import Icon from "@/components/Icon";

export default async function SignIn() {
  return (
    <AuthLayout img={femaleCatImg}>
      <form className="flex flex-col gap-[30px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-4xl">Sign in</h1>
          <span className="flex items-baseline gap-1">
            <span>Not have account yet?</span>
            <Link
              href={"/sign-up"}
              className="font-bold text-xl text-deep-lilac"
            >
              Sign up
            </Link>
          </span>
        </div>
        <div className="flex flex-col gap-[38px]">
          <div className="flex flex-col gap-5">
            <Input name="username" title="Username" />
            <Input name="password" type="password" title="Password" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="ml-2">
              <Link href="/forgot-password" className="text-azure">
                Forgot password?
              </Link>
            </div>
            <Button type="submit">Sign in</Button>
          </div>
        </div>
      </form>
      <div className="mt-[48px]"></div>
      <Divider>Or sign in with</Divider>
      <div className="mb-[30px]"></div>
      <div className="flex flex-col gap-[30px]">
        <Button customClassName="!bg-white !text-black">
          <div className="flex gap-5 items-center ml-[166px]">
            <Icon name="google" />
            <span>Sign in with Google</span>
          </div>
        </Button>
        <Button customClassName="!bg-white !text-black">
          <div className="flex gap-5 items-center ml-[166px]">
            <Icon name="facebook" />
            <span>Sign in with Facebook</span>
          </div>
        </Button>
      </div>
    </AuthLayout>
  );
}
