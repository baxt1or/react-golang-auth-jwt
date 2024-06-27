import { Loading } from "@/components/Loading";

import { Blog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
