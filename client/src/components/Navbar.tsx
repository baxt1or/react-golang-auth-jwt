import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { User } from "@/types";

export const Navbar = ({ user }: { user: User }) => {
  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
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

        {user ? (
          <>
            <div className="flex gap-4 items-center">
              <Link
                to="/write-blog"
                className={buttonVariants({ variant: "secondary" })}
              >
                Write
              </Link>

              <Button onClick={handleLogout} className="rounded-3xl">
                Logout
              </Button>
              <p className="text-sm font-bold text-black">{user.username}</p>
            </div>
          </>
        ) : (
          <>
            <Link to={"/login"} className={buttonVariants()}>
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
