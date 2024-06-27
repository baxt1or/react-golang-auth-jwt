export type Blog = {
  ID: number;
  title: string;
  content: string;
  user_id: number;
  sub_title: string;
  category: string;
  status: string;
  location: string;
};

export type User = {
  ID: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  blogs: Blog[];
};
