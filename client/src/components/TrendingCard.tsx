import { Blog } from "@/types";
import { Link } from "react-router-dom";

export const TrendingCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link
      to={`/blog/${blog.ID}`}
      className="flex flex-col gap-y-3 border-b py-4"
    >
      <p className="text-sm text-muted-foreground font-normal">
        baxtior @ september, 2024
      </p>
      <h1 className="text-sm text-black font-medium tracking-tight">
        {blog.title}
      </h1>
    </Link>
  );
};
