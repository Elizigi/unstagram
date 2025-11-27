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
    if (data.success && Array.isArray(data.allPosts)) {
      setPosts([...data.allPosts]);
    }
    console.log(data);
  };
  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const postTitle = data.get("title") as string;
    const postDescription = data.get("description") as string;
    const postUrl = data.get("url") as string;
    if (postTitle === "") return;
    reqCreatePost(postTitle, postDescription, postUrl);
  };
  const reqCreatePost = async (
    postTitle: string,
    postDescription: string,
    postUrl: string
  ) => {
    const response = await fetch(
      "http://localhost:3000/api/posts/post-create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ postTitle, postDescription, postUrl }),
      }
    );
    const data = await response.json();
    if (data.success) {
      console.log("Yipeee");
    }
  };
  return { posts, createPost };
};

export default MainMV;
