import Comment, { commentsByPostId } from "./Comment";
import { Image, images } from "./Image";
import User, { currentUser } from "./User";

type Post = {
  id: number;
  userId: number;
  user: User;
  content: string;
  created_at: Date;
  images: Image[];
  likes_count: number;
  comments: Comment[];
  comments_count: number;
  shares_count: number;
};

export const nearestPost: Post = {
  id: 1,
  userId: currentUser.user_id,
  user: currentUser,
  content: "",
  created_at: new Date("2023-09-21 17:33"),
  images: [images[0], images[1]],
  likes_count: 1200,
  comments: commentsByPostId,
  comments_count: 100,
  shares_count: 111,
};

export const posts: Post[] = [
  {
    id: 1,
    userId: currentUser.user_id,
    user: currentUser,
    content: "content",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: [],
    comments_count: 0,
    shares_count: 111,
  },
  {
    id: 2,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 3,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-10-03T15:40:00.278Z"),
    images: [
      images[2],
      images[3],
      images[4],
      images[5]
    ],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 4,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [
      images[6],
      images[7]
    ],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 5,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 6,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [
      images[8],
      images[9]
    ],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 7,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [
      images[10]
    ],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 8,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [
      images[11]
    ],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 9,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 10,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 11,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 12,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 13,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 14,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 15,
    userId: currentUser.user_id,
    user: currentUser,
    content: "",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
];

export const postsByUser: Post[] = posts;

export default Post;
