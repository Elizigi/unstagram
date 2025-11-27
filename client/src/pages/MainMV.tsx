import { useEffect, useState } from "react";
import type { Post } from "../model/postModel";

const MainMV = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const response = await fetch(
      "http://localhost:3000/api/posts/post-getall",
      { credentials: "include" }
    );
    const data = await response.json();
    if (data.success) {
      setPosts(data.allPosts);
    }
    console.log(data);
  };
  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const url = data.get("url") as string;
  };
  return { posts, createPost };
};

export default MainMV;
