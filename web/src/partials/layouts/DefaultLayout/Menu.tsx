"use client";

import MenuItem from "@/components/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import DefaultMenu from "@/constants/DefaultMenu";
import { FaHamburger } from "react-icons/fa";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClickMenuItem = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <nav>
        <div className="flex flex-col 3xl:gap-5 2xl:gap-2">
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
      <div className="absolute 3xl:bottom-[40px] 2xl:bottom-[calc(40px/6*5)]">
        <MenuItem prefixIcon={<FaHamburger />} label="More" />
      </div>
    </>
  );
}
