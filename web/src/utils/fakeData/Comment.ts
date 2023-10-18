import { Image } from "./Image";
import User, { users } from "./User";

type Comment = {
  id: number;
  user_id: number;
  post_id: number;
  user: User;
<<<<<<< HEAD
  created_at: Date;
=======
  createdAt: Date;
>>>>>>> ce04aef7e673d69d177a15c46ff3527a64a49ce4
  reply_comments?: Comment[];
  content: string;
  images?: Image[]
};

export const commentsByPostId: Comment[] = [
  {
    id: 1,
    user_id: 1,
    post_id: 1,
    user: users[0],
    created_at: new Date("2023-10-04 20:50"),
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
  },
  {
    id: 2,
    user_id: 2,
    post_id: 1,
    user: users[1],
    created_at: new Date("2023-10-04 20:53"),
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    reply_comments: [
      {
        id: 3,
        user_id: 3,
        post_id: 1,
        user: users[2],
        created_at: new Date("2023-10-04 20:54"),
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
      },
      {
        id: 4,
        user_id: 3,
        post_id: 1,
        user: users[2],
        created_at: new Date("2023-10-04 20:55"),
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
      },
    ],
  },
  {
    id: 5,
    user_id: 2,
    post_id: 1,
    user: users[1],
    created_at: new Date("2023-10-04 20:53"),
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    reply_comments: [
      {
        id: 3,
        user_id: 3,
        post_id: 1,
        user: users[2],
        created_at: new Date("2023-10-04 20:54"),
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
      },
      {
        id: 4,
        user_id: 3,
        post_id: 1,
        user: users[2],
        created_at: new Date("2023-10-04 20:55"),
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
      },
    ],
  },
];

export default Comment;
