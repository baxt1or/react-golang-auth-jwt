import { BlogCard } from "@/components/BlogCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { User } from "@/types";

export const UserPage = ({ user }: { user: User }) => {
  return (
    <>
      <div className="min-h-screen max-w-7xl mx-auto">
        <div className="md:flex pt-16">
          <div className="h-screen  md:w-3/4 md:border-r">
            <div className="px-6">
              <div className="border-b">
                <h1 className="text-sm font-bold text-black pt-4 pb-2 px-3">
                  Blogs Published
                </h1>
              </div>

              {user.blogs.map((blog) => (
                <BlogCard key={blog.ID} blog={blog} username={user.username} />
              ))}
            </div>
          </div>

          <div className="hidden md:block h-screen w-3/12 ">
            <div className="py-4 px-6">
              <div className="pt-12 flex flex-col gap-y-6">
                <div className="space-y-2">
                  <img
                    src="/lonely.jpg"
                    alt="logo"
                    className="h-32 w-32 rounded-full object-cover aspect-square"
                  />

                  <h1 className="text-md font-bold text-black text-start">
                    @{user.username}
                  </h1>
                </div>

                <h2 className="text-md font-normal text-muted-foreground tracking-wide">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-sm text-muted-foreground font-normal ">
                  Based in Tashkent, Investment Banker and Engineer
                </p>

                <h1 className="text-sm text-black font-medium flex gap-2">
                  0 Blogs
                  <span className="text-sm text-black font-medium ">
                    0 Read
                  </span>
                </h1>

                <Button
                  variant={"secondary"}
                  className="w-24 text-sm font-medium"
                >
                  Edit Profile
                </Button>
                <p className="text-sm text-muted-foreground font-medium">
                  Joined in 24 September
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
