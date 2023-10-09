"use client";

import EditProfileImg from "@/assets/imgs/edit-profile.png";
import Button from "@/components/Button";
import ProfileField from "@/components/ProfileField";
import IFormValues from "@/constants/IFormValues";
import { updateUser } from "@/services/userServices";
import { checkLogedInAction } from "@/store/actions/authActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function InfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormValues>();
  const auth = useSelector((state: any) => state.auth);
  const birthDayWatch = watch("date_of_birth");
  const genderWatch = watch("gender");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    auth.user && setDefaultForm();
  }, [auth.user]);

  const setDefaultForm = () => {
    setValue("first_name", auth.user.first_name);
    setValue("last_name", auth.user.last_name);
    setValue("gender", auth.user.gender);
    setValue("date_of_birth", auth.user.date_of_birth);
    setValue("address", auth.user.address);
    setValue("bio", auth.user.bio);
  };
  const handleSubmitForm = async (data: any) => {
    if (data.last_name || data.first_name) {
      data.full_name = data.first_name + " " + data.last_name;
    }

    try {
      await updateUser(data);
      toast.success("Updated user infomation!");
      dispatch(checkLogedInAction() as any);
    } catch (error) {
      toast.error("Error!");
    }
  };

  const handleErrorForm = (errors: any) => { };
  
  const handleReset = () => {
    router.push(`/profile/${auth.user.user_id}`);
  };

  return (
    <div className="relative">
      <Image
        src={EditProfileImg}
        alt="edit profile"
        className="3xl:w-[271px] w-[calc(271px/6*5)] 3xl:h-[187px] h-[calc(187px/6*5)] object-contain absolute -translate-y-full 3xl:top-[13px] top-[calc(13px/6*5)] left-1/2 -translate-x-1/2"
      />
      <form
        className="bg-white 3xl:rounded-[30px] rounded-[calc(30px/6*5)] 3xl:pt-[58px] pt-[calc(58px*0.75)] 3xl:pb-10 pb-8 3xl:pl-[77px] pl-[calc(77px*0.75)] 3xl:pr-[62px] pr-[calc(62px*0.75)]"
        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
      >
        <div className="flex flex-col 3xl:gap-[35px] gap-[calc(35px*0.75)]">
          <div className="3xl:pr-[51px] pr-[calc(51px*0.75)] flex flex-col 3xl:gap-[26px] gap-[calc(26px*0.75)]">
            <div className="flex flex-row 3xl:gap-10 gap-6">
              <div>
                <ProfileField
                  title="First name"
                  name="first_name"
                  register={register}
                />
              </div>
              <div>
                <ProfileField
                  title="Last name"
                  name="last_name"
                  register={register}
                />
              </div>
              <div>
                <ProfileField
                  title="Gender"
                  name="gender"
                  register={register}
                  type="radio"
                  options={[
                    {
                      label: "Male",
                      value: 0,
                    },
                    {
                      label: "Female",
                      value: 1,
                    },
                  ]}
                  watch={genderWatch}
                  setValue={setValue}
                />
              </div>
            </div>
            <div className="flex flex-row 3xl:gap-10 gap-6">
              <div>
                <ProfileField
                  title="Date of birth"
                  type="date"
                  name="date_of_birth"
                  register={register}
                  setValue={setValue}
                  watch={birthDayWatch}
                />
              </div>
              <ProfileField
                title="Address"
                name="address"
                register={register}
                customInputClassName="!w-full"
              />
            </div>
          </div>
          <ProfileField
            type="textarea"
            name="bio"
            title="Description"
            register={register}
            customInputClassName="!w-full"
          />
        </div>
        <div className="flex flex-row 3xl:gap-10 gap-6 justify-end 3xl:mt-12 mt-8">
          <Button
            onClick={handleReset}
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
