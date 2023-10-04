import FriendsList from "@/partials/app/FriendsLists/FriendsList";
import FriendsRequireList from "@/partials/app/FriendsLists/FriendsRequireList";
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

export const FriendMenu: any = [
  {
    id: 0,
    label: "Friend requirement list",
    Component: FriendsRequireList,
  },
  {
    id: 1,
    label: "Friend list",
    Component: FriendsList,
  },
  {
    id: 2,
    label: "Follower list",
    Component: FriendsList,
  },
  {
    id: 3,
    label: "Following list",
    Component: FriendsList,
  },
];

export default DefaultMenu;
