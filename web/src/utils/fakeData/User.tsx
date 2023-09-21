type User = {
  id: number;
  username: string;
  avatar?: string;
};

export const currentUser: User = {
  id: 10,
  username: "Current User",
};

export const users: User[] = [
  {
    id: 1,
    username: "Username 1",
    avatar:
      "https://wallstreetinsanity.com/wp-content/uploads/This-Survey-Shows-Us-How-Different-Men-And-Women-View-The-Perfect-Female-Face-.jpg",
  },
  {
    id: 2,
    username: "Username 1",
    avatar:
      "https://t3.ftcdn.net/jpg/06/26/55/28/360_F_626552858_bi09Gji5frGpM1EsJMKk7aIYH5mHdNAu.jpg",
  },
  {
    id: 3,
    username: "Username 1",
  },
  {
    id: 4,
    username: "Username 1",
  },
  {
    id: 5,
    username: "Username 1",
  },
];

export default User;
