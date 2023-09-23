type User = {
  id: number;
  username: string;
  avatar?: string;
  email: string;
};

export const currentUser: User = {
  id: 10,
  username: "Current User",
  email: "current-user@gmail.com",
};

export const users: User[] = [
  {
    id: 1,
    username: "Username 1",
    avatar:
      "https://wallstreetinsanity.com/wp-content/uploads/This-Survey-Shows-Us-How-Different-Men-And-Women-View-The-Perfect-Female-Face-.jpg",
    email: "user1@gmail.com",
  },
  {
    id: 2,
    username: "Username 2",
    avatar:
      "https://t3.ftcdn.net/jpg/06/26/55/28/360_F_626552858_bi09Gji5frGpM1EsJMKk7aIYH5mHdNAu.jpg",
    email: "user2@gmail.com",
  },
  {
    id: 3,
    username: "Username 3",
    email: "user3@gmail.com",
  },
  {
    id: 4,
    username: "Username 4",
    email: "user4@gmail.com",
  },
  {
    id: 5,
    username: "Username 5",
    email: "user5@gmail.com",
  },
];

export default User;
