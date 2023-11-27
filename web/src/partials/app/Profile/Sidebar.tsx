import Avatar from "@/components/Avatar";
import UserActionsButton from "./UserActionsButton";
import UserActions from "./UserActions";
import User from "@/utils/fakeData/User";
import ProfileAvatar from "./ProfileAvatar";
import { useSelector } from "react-redux";

type SidebarProps = {
  user: User;
};

export default function Sidebar({ user }: SidebarProps) {
  const auth = useSelector((state: any) => state.auth);
  return (
    <>
      <UserActionsButton userId={user.user_id} />
      <div className="mx-auto">
        <ProfileAvatar
          src={user.avatar_url}
          isAuth={auth.user.user_id == user.user_id}
        />
      </div>
      <span className="text-deep-lilac 3xl:text-2xl text-xl mt-3 text-center">
        {user.full_name}
      </span>
      {/* <div className="flex flex-row mx-auto w-[277px] justify-between 3xl:mt-[33px] mt-[calc(33px/6*5)]">
        <span>{user.posts_count ?? 0} Posts</span>
        <span>0 following</span>
        <span>0 Followers</span>
      </div> */}
      <div className="px-10 3xl:mt-6 mt-3">
        <UserActions friend={user.friend} userId={user.user_id} />
        {user.bio && (
          <div className="3xl:mt-[55px] mt-[calc(55px/6*5)]">
            <p>{user.bio}</p>
          </div>
        )}
      </div>
    </>
  );
}
