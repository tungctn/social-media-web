import UnAuthErrorImg from "@/assets/imgs/400.jpg";
import Image from "next/image";

export default function UnAuthenticatedError() {
  return (
    <main className="bg-[#94C3FB] w-screen h-screen">
      <div className="flex flex-col items-center">
        <Image
          src={UnAuthErrorImg}
          alt="404 error"
          className="h-[60vh] w-auto"
        />
        <div className="-mt-[60px] flex flex-col items-center gap-5">
          <span className="text-8xl font-bold">400</span>
          <span>You need to log in to access this page!</span>
          <span>
            Auto redirect after <span className="text-lg font-medium">1</span> second!
          </span>
        </div>
      </div>
    </main>
  );
}
