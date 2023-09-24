type User = {
  id: number;
  username: string;
  avatar?: string;
  email: string;
  intro?: string;
};

export const currentUser: User = {
  id: 10,
  username: "Current User",
  email: "current-user@gmail.com",
  intro:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
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
