"use client";

import AuthLayout from "@/layouts/AuthLayout";
import femaleCatImg from "@/assets/imgs/female-cat.png";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Link from "next/link";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import IFormValues from "@/constants/IFormValues";
import { FORM } from "@/constants/Messages";
import SocialMediaButtons from "@/partials/app/Auth/SocialMediaButtons";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
    <AuthLayout img={femaleCatImg}>
      <form
        className="flex flex-col gap-[30px]"
        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
        noValidate
      >
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
            <Input
              register={register}
              name="username"
              title="Username"
              rules={{
                required: true,
              }}
              error={errors.username?.message}
            />
            <Input
              register={register}
              name="password"
              type="password"
              title="Password"
              rules={{
                required: true,
              }}
              error={errors.password?.message}
            />
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
        <SocialMediaButtons />
      </div>
    </AuthLayout>
  );
}
