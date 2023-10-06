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
  userId: currentUser.user_id,
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
    userId: currentUser.user_id,
    user: currentUser,
    caption: "Caption",
    createdAt: new Date("2023-09-21 17:33"),
    images: [
      "https://www.tapchiyhoccotruyen.com/wp-content/uploads/2020/06/nhung-huou.jpg",
    ],
    likes: 1200,
    comments: 205,
    shares: 111,
  },
  {
    id: 2,
    userId: currentUser.user_id,
    user: currentUser,
    caption:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    createdAt: new Date("2023-09-21 17:33"),
    images: [
      "https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2022/7/9/photo1657324993775-1657324993859181735127.jpg",
      "https://cdn.tuoitre.vn/zoom/480_300/471584752817336320/2023/2/28/my-dieu-la-ai-02-16775761622441848129833-15-0-503-780-crop-1677576294466366146671.jpg",
      "https://image.lag.vn/upload/news/18/09/21/20180921-100151-t5yovp9_TSFQ.png",
      "https://inkythuatso.com/uploads/images/2022/05/nhung-hinh-anh-chu-meo-buon-de-thuong-dang-yeu-nhat-033414876-13-11-13-51.jpg",
    ],
    likes: 1200,
    comments: 205,
    shares: 111,
  },
  {
    id: 3,
    userId: currentUser.user_id,
    user: currentUser,
    caption: "",
    createdAt: new Date("2023-09-21 17:33"),
    images: [
      "https://aquasetup.com/wp-content/uploads/2023/04/Fantail-Goldfish_Waraphorn-Apha_Shutterstock.jpg",
      "https://aspidoras.com/wp-content/uploads/2021/07/ca-ba-duoi.jpg",
    ],
    likes: 1200,
    comments: 205,
    shares: 111,
  },
  {
    id: 4,
    userId: currentUser.user_id,
    user: currentUser,
    caption: "",
    createdAt: new Date("2023-09-21 17:33"),
    images: [
      "https://zoipet.com/wp-content/uploads/2022/07/Giong-cho-Bichon-Frise.jpg",
      "https://cdn.tgdd.vn/Files/2021/04/15/1343625/top-10-giong-cho-nho-nhat-the-gioi-nhin-la-chi-muon-be-ngay-202104151549372776.jpg",
    ],
    likes: 1200,
    comments: 205,
    shares: 111,
  },
  {
    id: 5,
    userId: currentUser.user_id,
    user: currentUser,
    caption: "",
    createdAt: new Date("2023-09-21 17:33"),
    images: [
      "https://petmeshop.com/wp-content/uploads/2022/04/Ky-thuat-nuoi-vet-xanh-danh-cho-nguoi-moi.jpg",
    ],
    likes: 1200,
    comments: 205,
    shares: 111,
  },
  {
    id: 6,
    userId: currentUser.user_id,
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
  },
  {
    id: 7,
    userId: currentUser.user_id,
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
  },
  {
    id: 8,
    userId: currentUser.user_id,
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
  },
  {
    id: 9,
    userId: currentUser.user_id,
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
  },
  {
    id: 10,
    userId: currentUser.user_id,
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
  },
  {
    id: 11,
    userId: currentUser.user_id,
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
  },
  {
    id: 12,
    userId: currentUser.user_id,
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
  },
  {
    id: 13,
    userId: currentUser.user_id,
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
  },
  {
    id: 14,
    userId: currentUser.user_id,
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
  },
  {
    id: 15,
    userId: currentUser.user_id,
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
  },
];

export const postsByUser: Post[] = posts;

export default Post;
