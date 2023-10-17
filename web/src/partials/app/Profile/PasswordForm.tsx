import IFormValues from "@/constants/IFormValues";
import Image from "next/image";
import { useForm } from "react-hook-form";
import EditPasswordImg from "@/assets/imgs/edit-password.png";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FORM } from "@/constants/Messages";
import { updatePassword } from "@/services/userServices";
import { toast } from "react-toastify";

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
    reset,
  } = useForm<IFormValues>();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);

  const handleSubmitForm = async (data: any) => {
    const newPassword = {
      old_password: data.old_password,
      password: data.password,
    };

    try {
      updatePassword(newPassword);
      toast.success("Updated password!");
      reset();
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleErrorForm = (errors: any) => {
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

  const handleCancel = () => {
    router.push(`/profile/${auth.user.user_id}`);
  };
  return (
    <div className="relative 3xl:w-[480px] w-[calc(480px/6*5)] mx-auto">
      <div className="absolute 3xl:-left-[294px] -left-[calc(294px/6*5)] translate-x-[11px] 3xl:top-[29px] top-[calc(29px/6*5)]">
        <Image
          src={EditPasswordImg}
          alt=""
          className="3xl:w-[294px] w-[calc(294px/6*5)] 3xl:h-[334px] h-[calc(334px/6*5)]"
        />
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
        className="bg-white rounded-[20px] 3xl:pt-10 pt-8 3xl:px-10 px-8 3xl:pb-[34px] pb-[calc(34px/6*5)]"
      >
        <div className="flex flex-col 3xl:gap-[30px] gap-[calc(30px/6*5)]">
          <Input
            title="Password"
            name="old_password"
            register={register}
            type="password"
            error={errors.old_password?.message}
            rules={{
              required: true,
            }}
          />
          <Input
            name="password"
            register={register}
            title="New password"
            type="password"
            error={errors.password?.message}
            rules={{
              required: true,
            }}
          />
          <Input
            name="repassword"
            register={register}
            title="Confirm new password"
            type="password"
            rules={{
              required: true,
              validate: {
                incorrect: (value: string, formValues: any) => {
                  return value === formValues.password;
                },
              },
            }}
            error={errors.repassword?.message}
          />
        </div>
        <div className="flex flex-row 3xl:gap-10 gap-6 justify-end 3xl:mt-[49px] mt-[calc(49px/6*5)]">
          <Button
            onClick={handleCancel}
            customClassName="3xl:!h-10 !h-[calc(40px*0.75)] !bg-white 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-xl !text-base !text-deep-lilac 3xl:!w-[160px] !w-[calc(160px*0.75)]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            customClassName="3xl:!h-10 !h-[calc(40px*0.75)] 3xl:!rounded-[10px] !rounded-[calc(10px*0.75)] 3xl:!text-xl !text-base 3xl:!w-[160px] !w-[calc(160px*0.75)]"
          >
            Accept
          </Button>
        </div>
      </form>
    </div>
  );
}
