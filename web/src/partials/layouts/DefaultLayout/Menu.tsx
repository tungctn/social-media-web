"use client";

import MenuItem from "@/components/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import DefaultMenu from "@/constants/DefaultMenu";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { checkLogedInAction } from "@/store/actions/authActions";
import { toast } from "react-toastify";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickMenuItem = (href: string) => {
    if (href) {
      router.push(href);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Signed out!");
    dispatch(checkLogedInAction() as any);
  };

  return (
    <>
      <nav>
        <div className="flex flex-col 3xl:gap-5 gap-2">
          {DefaultMenu.map((menuItem: any) => {
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
      <div className="absolute 3xl:bottom-[40px] bottom-[calc(40px/6*5)]">
        <MenuItem
          prefixIcon={<FaArrowRightToBracket />}
          onClick={handleSignOut}
          label="Sign out"
        />
      </div>
    </>
  );
}
