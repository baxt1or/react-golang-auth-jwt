export type Blog = {
  ID: number;
  title: string;
  content: string;
  user_id: number;
};

export type User = {
  ID: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  blogs: null;
};
