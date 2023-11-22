"use client";

import MenuItem from "@/components/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import DefaultMenu from "@/constants/DefaultMenu";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { checkLogedInAction } from "@/store/actions/authActions";
import { toast } from "react-toastify";
import { Role } from "@/utils/fakeData/User";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const handleClickMenuItem = (href: string) => {
    if (href) {
      router.push(href);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Signed out!");
    dispatch(checkLogedInAction() as any);
    router.push('/sign-in')
  };

  return (
    <>
      <nav>
        <div className="flex flex-col 3xl:gap-5 gap-2">
          {DefaultMenu.map((menuItem: any) => {
            if (auth.user.role == Role.Admin && menuItem.onlyAdmin) {
              return (
                <MenuItem
                  key={menuItem.label}
                  prefixIcon={<menuItem.PrefixIcon />}
                  label={menuItem.label}
                  isActive={menuItem.href === pathname}
                  onClick={() => handleClickMenuItem(menuItem.href)}
                />
              );
            } else if (auth.user.role == Role.User && menuItem.onlyUser) {
              return (
                <MenuItem
                  key={menuItem.label}
                  prefixIcon={<menuItem.PrefixIcon />}
                  label={menuItem.label}
                  isActive={menuItem.href === pathname}
                  onClick={() => handleClickMenuItem(menuItem.href)}
                />
              );
            } else if (
              menuItem.onlyUser === undefined &&
              menuItem.onlyAdmin === undefined
            )
              return (
                <MenuItem
                  key={menuItem.label}
                  prefixIcon={<menuItem.PrefixIcon />}
                  label={menuItem.label}
                  isActive={menuItem.href === pathname}
                  onClick={() => handleClickMenuItem(menuItem.href)}
                />
              );
          })}
        </div>
      </nav>
      <div className="absolute 3xl:bottom-[40px] bottom-[calc(40px/4*3)]">
        <MenuItem
          prefixIcon={<FaArrowRightToBracket />}
          onClick={handleSignOut}
          label="Sign out"
        />
      </div>
    </>
  );
}
