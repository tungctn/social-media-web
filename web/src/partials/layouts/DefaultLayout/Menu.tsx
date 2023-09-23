"use client";

import Tab from "@/components/Tab";
import { usePathname, useRouter } from "next/navigation";
import DefaultMenu from "@/constants/DefaultMenu";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClickMenuItem = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="mt-[47px] flex flex-col gap-5">
      {DefaultMenu.map((menuItem: any) => {
        return (
          <Tab
            key={menuItem.label}
            prefixIcon={<menuItem.PrefixIcon />}
            label={menuItem.label}
            isActive={menuItem.href === pathname}
            onClick={() => handleClickMenuItem(menuItem.href)}
          />
        );
      })}
    </nav>
  );
}
