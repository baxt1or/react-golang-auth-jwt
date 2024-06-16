import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";

type Props = {
  username: string;
};

export const Navbar = ({ username }: Props) => {
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
    <header className="fixed top-0 right-0 left-0   bg-white border-b px-6 py-2.5">
      <nav className="flex items-center justify-between">
        <Link to="/" className="text-sm font-bold text-black">
          Pearson Hardman
        </Link>

        {username ? (
          <>
            <div className="space-x-2">
              <Button variant={"secondary"} onClick={handleLogout}>
                Logout
              </Button>
              <Button>Post</Button>
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
