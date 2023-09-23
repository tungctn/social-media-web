import { FaUserCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import BoxHeader from "@/components/BoxHeader";
import { users } from "@/utils/fakeData/User";
import Avatar from "@/components/Avatar";

export default function FriendsList() {
  return (
    <div className="w-full py-[30px] px-[30px] bg-white rounded-[30px]">
      <BoxHeader title="Friend List" />
      <div className="flex flex-col gap-6 mt-9">
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex flex-row gap-5 items-center cursor-pointer"
            >
              <Avatar size={40} src={user.avatar} />
              <span className="text-xl">{user.username}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}