import { FaHome } from "react-icons/fa";
import { GoFileMedia } from "react-icons/go";

const DefaultMenu: any = [
  {
    label: "Home",
    PrefixIcon: FaHome,
    href: "/",
  },
  {
    label: "Menu 1",
    PrefixIcon: GoFileMedia,
    href: "/menu-1",
  },
  {
    label: "Menu 2",
    PrefixIcon: GoFileMedia,
    href: "/menu-2",
  },
];

export default DefaultMenu;
