import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { Blog } from "@/types";

type Props = {
  blog: Blog;
  username?: string;
};

export const BlogCard = ({ blog, username }: Props) => {
  return (
    <Link
      to={`/blog/${blog.ID}`}
      className="flex flex-col gap-y-4 md:flex-row items-center justify-between border-b p-4"
    >
      <div className="flex flex-col gap-y-8">
        <p className="text-sm text-black font-bold">
          @{username} | september, 2024
        </p>
        <div>
          <h1 className="text-lg text-black font-medium">{blog.title}</h1>
          <h2 className="text-sm text-muted-foreground font-normal truncate max-w-md">
            {blog.content}
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <Button size="sm" className="rounded-3xl">
            {blog.category}
          </Button>
          <Heart className="w-5 h-5 text-gray-400 " />
        </div>
      </div>

      <img
        src="/lonely.jpg"
        alt="guy"
        className="w-[150px] h-[150px] object-contain aspect-square rounded-sm"
      />
    </Link>
  );
};
