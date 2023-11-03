import Image from "next/image";
import UnauthorizedImg from "@/assets/imgs/401.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { checkLogedInAction } from "@/store/actions/authActions";
import { useRouter } from "next/navigation";

export default function UnauthorizedError() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Signed out!");
    dispatch(checkLogedInAction() as any);
    router.push("/sign-in");
  };
  return (
    <main className="bg-[#7FB3FF] w-screen h-screen flex items-center justify-center">
      <div className="flex flex-row items-center">
        <Image
          src={UnauthorizedImg}
          alt="401 error"
          className="h-[60vh] w-auto"
        />
        <div className="-mt-[60px] flex flex-col items-start gap-5">
          <span className="text-8xl font-bold">Sorry!</span>
          <span className="text-4xl">You are not unauthorized to access.</span>
          <span className="text-xl">
            Try{" "}
            <button
              className="text-deep-lilac transition-all duration-300 ease-linear hover:text-deep-lilac/80"
              onClick={handleLogout}
              type="button"
              title="logout"
            >
              Logout!
            </button>
          </span>
        </div>
      </div>
    </main>
  );
}
