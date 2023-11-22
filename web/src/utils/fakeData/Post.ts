import { ReactType } from "@/constants/Others";
import Comment, { commentsByPostId } from "./Comment";
import { Image, images } from "./Image";
import User, { currentUser } from "./User";

enum PostTopic {
  education = "education",
  share = "share_experience",
  evaluate = "evaluate",
  event = "event",
  other = "other",
}

interface PostTopicData {
  title: string;
  alias: string;
  value: number;
  color: string;
}

export function getPostTopicData(
  postTopic: PostTopic,
  value: number,
): PostTopicData {
  switch (postTopic) {
    case PostTopic.education:
      return {
        title: "Giáo dục",
        value,
        color: "#F15A3D",
        alias: "education",
      };
    case PostTopic.share:
      return {
        title: "Chia sẻ kinh nghiệm",
        value,
        color: "#FED34A",
        alias: "share_experience",
      };
    case PostTopic.evaluate:
      return {
        title: "Đánh giá",
        value,
        color: "#8E6AAE",
        alias: "evaluate",
      };
    case PostTopic.event:
      return {
        title: "Sự kiện",
        value,
        color: "#89C761",
        alias: "event",
      };
    default:
      return {
        title: "Khác",
        value,
        color: "#359CC9",
        alias: "other",
      };
  }
}

type Post = {
  id: number;
  userId?: number;
  user_id?: number;
  user: User;
  content: string;
  created_at: Date;
  images: Image[];
  likes_count: number;
  comments: Comment[];
  comments_count: number;
  shares_count: number;
  type_react?: ReactType;
  share_post?: Post;
};

export const nearestPost: Post = {
  id: 1,
  userId: currentUser.user_id,
  user: currentUser,
  content:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    user_id: currentUser.user_id,
    user: currentUser,
    content: "content",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: [],
    comments_count: 0,
    shares_count: 111,
    type_react: 1,
  },
  {
    id: 2,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 3,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-10-03T15:40:00.278Z"),
    images: [images[2], images[3], images[4], images[5]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 4,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[6], images[7]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 5,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[8], images[9], images[10]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 7,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[10]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 8,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[11]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
  {
    id: 9,
    userId: currentUser.user_id,
    user: currentUser,
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    created_at: new Date("2023-09-21 17:33"),
    images: [images[0], images[1]],
    likes_count: 1200,
    comments: commentsByPostId,
    comments_count: 100,
    shares_count: 111,
  },
];

export const postsByUser: Post[] = posts;

export const statisticalPosts: any = posts.map((post) => {
  return {
    id: post.id,
    images: post.images,
    reactAmount: post.likes_count,
    negativeCommentsPercent: 60,
  };
});

export const postsAnalysis: any = {
  1: 2,
  2: 3,
  3: 4,
  5: 10,
  6: 30,
  7: 44,
  9: 12,
  10: 4,
  11: 5,
  12: 24,
};

export default Post;
