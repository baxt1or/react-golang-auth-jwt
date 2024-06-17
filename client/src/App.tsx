import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { WriteBlog } from "./pages/WriteBlog";
import { BlogPage } from "./pages/BlogPage";
import { User } from "./types";
import { Loading } from "./components/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user`, {
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

function App() {
  const { data, error, isLoading } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home user={data} />} />

          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/blog/:id" element={<BlogPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
