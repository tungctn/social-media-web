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
import { useDispatch } from "react-redux";
import { logInAction } from "@/store/actions/authActions";
import { toast } from "react-toastify";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormValues>();
  const dispatch = useDispatch();

  const handleSubmitForm: SubmitHandler<IFormValues> = (data: any) => {
    try {
      dispatch(logInAction(data) as any);
    } catch (error) {
      toast.error("Sign in error!");
    }
  };

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
        className="flex flex-col 3xl:gap-[30px] gap-[25px]"
        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
        noValidate
      >
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold 3xl:text-4xl text-3xl">Sign in</h1>
          <span className="flex items-baseline gap-1">
            <span>Not have account yet?</span>
            <Link
              href={"/sign-up"}
              className="font-bold 3xl:text-xl text-lg text-deep-lilac"
            >
              Sign up
            </Link>
          </span>
        </div>
        <div className="flex flex-col 3xl:gap-[38px] gap-5">
          <div className="flex flex-col 3xl:gap-5 gap-4">
            <Input
              register={register}
              name="email"
              type="email"
              title="Email"
              rules={{
                required: true,
              }}
              error={errors.email?.message}
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
          <div className="flex flex-col 3xl:gap-3 gap-2">
            <div className="ml-2">
              <Link href="/forgot-password" className="text-azure">
                Forgot password?
              </Link>
            </div>
            <Button type="submit">Sign in</Button>
          </div>
        </div>
      </form>
      <div className="3xl:mt-[48px] mt-7"></div>
      <Divider>Or sign in with</Divider>
      <div className="3xl:mb-[30px] mb-7"></div>
      <div className="flex flex-col 3xl:gap-[30px] gap-4">
        <SocialMediaButtons />
      </div>
    </AuthLayout>
  );
}
