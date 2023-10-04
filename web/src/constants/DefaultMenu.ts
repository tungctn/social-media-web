import NewPostForm from "@/partials/app/Post/NewPostForm";
import { FaHome } from "react-icons/fa";
import { FaMagnifyingGlass, FaRegSquarePlus } from "react-icons/fa6";

const DefaultMenu: any = [
  {
    label: "Home",
    PrefixIcon: FaHome,
    href: "/",
  },
  {
    label: "New post",
    PrefixIcon: FaRegSquarePlus,
    href: null,
    Component: NewPostForm,
  },
  {
    label: "Search",
    PrefixIcon: FaMagnifyingGlass,
    href: "/search",
  },
];

export default DefaultMenu;
