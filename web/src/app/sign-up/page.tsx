"use client";

import AuthLayout from "@/layouts/AuthLayout";
import maleImage from "@/assets/imgs/male-cat.png";
import Link from "next/link";
import Input from "@/components/Input";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import IFormValues from "@/constants/IFormValues";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { FORM } from "@/constants/Messages";
import SocialMediaButtons from "@/partials/app/Auth/SocialMediaButtons";
import { signUp } from "@/services/userServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormValues>();
  const router = useRouter();

  const handleSubmitForm: SubmitHandler<IFormValues> = async (data) => {
    const newUser = {
      ...data,
      full_name: `${data.first_name} ${data.last_name}`,
    };

    try {
      const res = await signUp(newUser);
      router.push("/sign-in");
    } catch (error) {
      toast.error("Sign up error!");
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
    <AuthLayout img={maleImage}>
      <div className="w-full 3xl:py-[71px] py-14">
        <form
          className="flex flex-col 3xl:gap-[30px] gap-[25px]"
          onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
          noValidate
        >
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-bold 3xl:text-4xl text-3xl">Sign up</h1>
            <span className="flex items-baseline gap-1">
              <span>Already have account?</span>
              <Link
                href={"/sign-in"}
                className="font-bold 3xl:text-xl text-lg text-deep-lilac"
              >
                Sign in
              </Link>
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col 3xl:gap-[38px] gap-4">
              <div className="flex flex-row 3xl:gap-5 gap-3">
                <Input
                  register={register}
                  rules={{
                    required: true,
                  }}
                  name="first_name"
                  title="First name"
                  error={errors.first_name?.message}
                />
                <Input
                  register={register}
                  rules={{
                    required: true,
                  }}
                  name="last_name"
                  title="Last name"
                  error={errors.last_name?.message}
                />
              </div>
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
        <div className="3xl:mt-[22px] mt-5"></div>
        <Divider>Or</Divider>
        <div className="3xl:mb-[23px] mt-5"></div>
        <div className="flex flex-row gap-3">
          <SocialMediaButtons hasFacebookLabel={false} />
        </div>
      </div>
    </AuthLayout>
  );
}
