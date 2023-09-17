"use client";

import AuthLayout from "@/layouts/AuthLayout";
import maleImage from "@/assets/imgs/male-cat.png";
import Link from "next/link";
import Input from "@/components/Input";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import IFormValues from "@/constants/IFormValues";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { FORM } from "@/constants/Messages";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormValues>();

  const handleSubmitForm: SubmitHandler<IFormValues> = async (data) => {};

  const handleErrorForm: SubmitErrorHandler<IFormValues> = (errors: any) => {
    for (const name in errors) {
      if (Object.hasOwnProperty.call(errors, name)) {
        const type = errors[name].type;
        setError(name as any, {
          type,
          message: FORM[name][type],
        });
      }
    }
  };
  return (
    <AuthLayout img={maleImage}>
      <form
        className="flex flex-col gap-[30px]"
        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
        noValidate
      >
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
            <Input
              register={register}
              rules={{
                required: true,
                pattern: /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
              }}
              name="username"
              title="Username"
              error={errors.username?.message}
            />
            <Input
              register={register}
              rules={{
                required: true,
                pattern: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g,
              }}
              name="email"
              type="email"
              title="Email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              rules={{
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              }}
              name="password"
              type="password"
              title="Password"
              error={errors.password?.message}
            />
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
