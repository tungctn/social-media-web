type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar_url?: string;
  email: string;
  bio?: string;
};

export const currentUser: User = {
  user_id: 10,
  full_name: "Current User",
  email: "current-user@gmail.com",
  bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  first_name: "Current",
  last_name: "User",
};

export const users: User[] = [
  {
    user_id: 1,
    full_name: "User 1",
    avatar_url:
      "https://wallstreetinsanity.com/wp-content/uploads/This-Survey-Shows-Us-How-Different-Men-And-Women-View-The-Perfect-Female-Face-.jpg",
    email: "user1@gmail.com",
    first_name: "User",
    last_name: "1",
  },
  {
    user_id: 2,
    full_name: "User 2",
    avatar_url:
      "https://t3.ftcdn.net/jpg/06/26/55/28/360_F_626552858_bi09Gji5frGpM1EsJMKk7aIYH5mHdNAu.jpg",
    email: "user2@gmail.com",
    first_name: "User",
    last_name: "2",
  },
  {
    user_id: 3,
    full_name: "User 3",
    email: "user3@gmail.com",
    first_name: "User",
    last_name: "3",
  },
  {
    user_id: 4,
    full_name: "User 4",
    email: "user4@gmail.com",
    first_name: "User",
    last_name: "4",
  },
  {
    user_id: 5,
    full_name: "User 5",
    email: "user5@gmail.com",
    first_name: "User",
    last_name: "5",
  },
];

export const friends: User[] = [
  {
    user_id: 1,
    full_name: "User 1",
    avatar_url:
      "https://wallstreetinsanity.com/wp-content/uploads/This-Survey-Shows-Us-How-Different-Men-And-Women-View-The-Perfect-Female-Face-.jpg",
    email: "user1@gmail.com",
    first_name: "User",
    last_name: "1",
  },
  {
    user_id: 2,
    full_name: "User 2",
    avatar_url:
      "https://t3.ftcdn.net/jpg/06/26/55/28/360_F_626552858_bi09Gji5frGpM1EsJMKk7aIYH5mHdNAu.jpg",
    email: "user2@gmail.com",
    first_name: "User",
    last_name: "2",
  },
  {
    user_id: 3,
    full_name: "User 3",
    email: "user3@gmail.com",
    first_name: "User",
    last_name: "3",
  },
  {
    user_id: 4,
    full_name: "User 4",
    email: "user4@gmail.com",
    first_name: "User",
    last_name: "4",
  },
  {
    user_id: 5,
    full_name: "User 5",
    email: "user5@gmail.com",
    first_name: "User",
    last_name: "5",
  },
  {
    user_id: 6,
    full_name: "User 1",
    avatar_url:
      "https://wallstreetinsanity.com/wp-content/uploads/This-Survey-Shows-Us-How-Different-Men-And-Women-View-The-Perfect-Female-Face-.jpg",
    email: "user1@gmail.com",
    first_name: "User",
    last_name: "1",
  },
  {
    user_id: 7,
    full_name: "User 2",
    avatar_url:
      "https://t3.ftcdn.net/jpg/06/26/55/28/360_F_626552858_bi09Gji5frGpM1EsJMKk7aIYH5mHdNAu.jpg",
    email: "user2@gmail.com",
    first_name: "User",
    last_name: "2",
  },
  {
    user_id: 8,
    full_name: "User 3",
    email: "user3@gmail.com",
    first_name: "User",
    last_name: "3",
  },
  {
    user_id: 9,
    full_name: "User 4",
    email: "user4@gmail.com",
    first_name: "User",
    last_name: "4",
  },
  {
    user_id: 10,
    full_name: "User 5",
    email: "user5@gmail.com",
    first_name: "User",
    last_name: "5",
  },
];

export default User;
