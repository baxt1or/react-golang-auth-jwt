import { BlogCard } from "@/components/BlogCard";

import { Categories } from "@/components/Categories";
import { Loading } from "@/components/Loading";
import { Navbar } from "@/components/Navbar";
import { TrendingCard } from "@/components/TrendingCard";
import { buttonVariants } from "@/components/ui/button";
import { Blog, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchBlogs = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/blog", {
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

const Home = ({ user }: { user: User }) => {
  const { data, error, isLoading } = useQuery<Blog[] | null>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
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
      <div className="md:flex pt-16">
        <div className="h-screen  md:w-3/4 md:border-r">
          {user ? (
            <div className="px-6">
              <div className="border-b">
                <h1 className="text-sm font-bold text-black pt-4 pb-2 px-3">
                  Home
                </h1>
              </div>

              {data.map((blog) => (
                <BlogCard key={blog.ID} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 items-center">
              <p className="text-4xl font-extrabold text-center">
                Welcome to Pearson Hardman
              </p>
              <Link
                to={"/login"}
                className={buttonVariants({ variant: "secondary" })}
              >
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="hidden md:block h-screen w-3/12 ">
          <div className="py-4 px-6">
            <Categories />

            <div className="pt-12">
              <h1 className="text-sm font-bold text-black ">Tending</h1>
              {data.map((blog) => (
                <TrendingCard key={blog.ID} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
