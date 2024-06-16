import { Navbar } from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Props = {
  firstname: string;
  lastname: string;
  username: string;
};

const Home = ({ firstname, lastname, username }: Props) => {
  return (
    <>
      <Navbar username={username} />

      <div className="flex items-center justify-center min-h-screen max-w-7xl mx-auto">
        {firstname ? (
          <div className="flex flex-col gap-y-4">
            <p className="text-4xl font-extrabold text-center">
              Welcome to Pearson Hardman
            </p>
            <h1 className="text-xl font-extrabold text-center">
              {firstname} {lastname}
            </h1>
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
    </>
  );
};

export default Home;
