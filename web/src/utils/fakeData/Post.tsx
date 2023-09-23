import User, { currentUser, users } from "./User";

type Post = {
  id: number;
  userId: number;
  user: User;
  caption: string;
  createdAt: Date;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
};

export const nearestPost: Post = {
  id: 1,
  userId: currentUser.id,
  user: currentUser,
  caption: "",
  createdAt: new Date("2023-09-21 17:33"),
  images: [
    "https://bizweb.dktcdn.net/100/378/891/files/tac-dung-cua-nhung-huou-4.jpg",
    "https://www.tapchiyhoccotruyen.com/wp-content/uploads/2020/06/nhung-huou.jpg",
  ],
  likes: 1200,
  comments: 205,
  shares: 111,
};

export const posts: Post[] = [
  {
    id: 1,
    userId: 1,
    user: users[0],
    caption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    createdAt: new Date("2023-09-21 17:33"),
    images: [
      "https://bizweb.dktcdn.net/100/378/891/files/tac-dung-cua-nhung-huou-4.jpg",
      "https://www.tapchiyhoccotruyen.com/wp-content/uploads/2020/06/nhung-huou.jpg",
    ],
    likes: 1200,
    comments: 205,
    shares: 111,
  },
  {
    id: 2,
    userId: 2,
    user: users[1],
    caption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    createdAt: new Date("2023-09-21 17:47"),
    images: [
      "https://bizweb.dktcdn.net/100/378/891/files/tac-dung-cua-nhung-huou-4.jpg",
      "https://www.tapchiyhoccotruyen.com/wp-content/uploads/2020/06/nhung-huou.jpg",
    ],
    likes: 1200,
    comments: 205,
    shares: 111,
  },
];

export default Post;
