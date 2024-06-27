import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SyntheticEvent } from "react";
import { Button } from "./ui/button";
import { User } from "@/types";
import { User as Avatar } from "lucide-react";
import { Link } from "react-router-dom";

export const UserMenuBar = () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full bg-gray-100 p-2 outline-none border-none">
        <Avatar className="w-6 h-6 text-black font-thin" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-2 p-4 space-y-4" align="center">
        <Link to="/user" className="text-sm text-muted-foreground">
          My Account
        </Link>

        <DropdownMenuSeparator />

        <Link to="/dashboard" className="text-sm text-muted-foreground">
          Dashboard
        </Link>
        <DropdownMenuSeparator />
        <Link to="/settings" className="text-sm text-muted-foreground">
          Settings
        </Link>
        <DropdownMenuSeparator />
        <button
          className="text-sm text-muted-foreground"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
