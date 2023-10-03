import { getCurrentUserInfos, signIn } from "@/services/userServices";
import { CHECK_LOGED_IN, LOG_IN } from "../constants/authTypes";
import { toast } from "react-toastify";

const logInAction =
  (userAccount: { email: string; password: string }) =>
  async (dispatch: (arg0: { type: string; success: boolean }) => void) => {
    try {
      const res: any = await signIn(userAccount);
      if (res.success) {
        const { user, token } = res.data;

        localStorage.setItem("token", token);
        dispatch({
          type: LOG_IN,
          success: true,
        });

        toast.success("Loged in!");
      } else {
        toast.error("API success false!");
      }
    } catch (error) {
      toast.error("Catch sign in false!");
    }
  };

const checkLogedInAction = () => async (dispatch: any, getState: any) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const res: any = await getCurrentUserInfos();
      if (res.success) {
        const { user_info: userInfo } = res.data;
        dispatch({
          type: CHECK_LOGED_IN,
          userInfo: userInfo ? userInfo : {},
        });
      } else {
        toast.error("API Check Loged in false!");
      }
    } catch (error) {
      toast.error("Catch Check Loged in false!");
    }
  } else {
    dispatch({
      type: CHECK_LOGED_IN,
      userInfo: null,
    });
  }
};

const logOutAction = () => async (dispatch: any) => {};

export { logInAction, checkLogedInAction, logOutAction };
