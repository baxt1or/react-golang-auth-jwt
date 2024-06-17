import { Loading } from "@/components/Loading";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const fetchBlog = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/blog/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Error: ${error.response.data} - ${error.response.data}`);
  }
};

export const BlogPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<Blog | null>({
    queryKey: ["blog"],
    queryFn: () => fetchBlog(id!),
  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!data) {
    return <h1>No blogs there</h1>;
  }
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <header className="fixed top-0 right-0 left-0  bg-white border-b px-12 py-2.5">
        <nav className="flex items-center justify-between">
          <div className="flex gap-8">
            <Link to="/" className="text-sm font-bold text-black">
              <img src="/logo.png" alt="logo" className="w-8 h-8" />
            </Link>
            <Input
              placeholder="Search a blog"
              className="bg-gray-100 rounded-3xl outline-none border-none w-72"
            />
          </div>

          <div className="flex gap-4 items-center">
            <Link
              to="/write-blog"
              className={buttonVariants({ variant: "secondary" })}
            >
              Write
            </Link>

            <p className="text-sm font-bold text-black">baxtior</p>
          </div>
        </nav>
      </header>

      <div className="mt-16 flex flex-col gap-y-8">
        <h1 className="text-3xl font-extrabold text-black pt-12">
          {data.title}
        </h1>
        <p className="text-sm text-center text-muted-foreground font-normal ">
          {data.content}
        </p>
      </div>
    </div>
  );
};
