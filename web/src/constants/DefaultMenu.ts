import FriendsList from "@/partials/app/FriendsLists/FriendsList";
import FriendsRequireList from "@/partials/app/FriendsLists/FriendsRequireList";
import NewPostForm from "@/partials/app/Post/NewPostForm";
import ImagesList from "@/partials/app/Report/ImagesList";
import TextList from "@/partials/app/Report/TextList";
import { FaHome } from "react-icons/fa";
import { FaMagnifyingGlass, FaRegSquarePlus } from "react-icons/fa6";
import { TbReportOff } from "react-icons/tb";

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
    href: "/search/",
  },
  {
    label: "Report",
    PrefixIcon: TbReportOff,
    href: "/report/",
    onlyAdmin: true,
  },
];

export enum FriendMenuEnum {
  Require = 0,
  Friend = 1,
  Follower = 2,
  Following = 3,
}

export const FriendMenu: any = [
  {
    id: FriendMenuEnum.Require,
    label: "Friend requirement list",
    Component: FriendsRequireList,
  },
  {
    id: FriendMenuEnum.Friend,
    label: "Friend list",
    Component: FriendsList,
    title: "All friends",
  },
  {
    id: FriendMenuEnum.Follower,
    label: "Follower list",
    Component: FriendsList,
    title: "All followers",
  },
  {
    id: FriendMenuEnum.Following,
    label: "Following list",
    Component: FriendsList,
    title: "Following",
  },
];

export enum ReportMenuEnum {
  ReportImage = 0,
  ReportText = 1,
  CommentImage = 2,
  CommentText = 3,
}

export const ReportMenu: any = [
  {
    id: "report-comment",
    label: "Report comment",
    items: [
      {
        id: ReportMenuEnum.CommentImage,
        label: "Violated images",
        Component: ImagesList,
      },
      {
        id: ReportMenuEnum.CommentText,
        label: "Violated text",
        Component: TextList,
      },
    ],
  },
  {
    id: "report-post",
    label: "Report post",
    items: [
      {
        id: ReportMenuEnum.ReportImage,
        label: "Violated images",
        Component: ImagesList,
      },
      {
        id: ReportMenuEnum.ReportText,
        label: "Violated text",
        Component: TextList,
      },
    ],
  },
];

export default DefaultMenu;
