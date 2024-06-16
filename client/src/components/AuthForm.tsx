import React from "react";
import { Link } from "react-router-dom";

type Props = {
  label: string;
  children: React.ReactNode;
  messageLinkBack: string;
  messageBack: string;
  message: string;
};

export const AuthForm = ({
  children,
  label,
  message,
  messageBack,
  messageLinkBack,
}: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen -mt-">
      <div className="w-[400px] p-4 flex flex-col gap-y-4">
        <h1 className="text-center text-4xl font-bold text-black">{label}</h1>
        {children}

        <div className="flex gap-2 items-center justify-center">
          <p className="text-md text-muted-foreground font-normal cursor-pointer">
            {message}
          </p>
          <Link
            to={messageLinkBack}
            className="text-md text-blue-500 font-normal underline hover:opacity-50 cursor-pointer"
          >
            {messageBack}
          </Link>
        </div>
      </div>
    </div>
  );
};
