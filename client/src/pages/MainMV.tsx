import { useEffect, useState } from "react";
import type { Post } from "../model/postModel";

const MainMV = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3000/api/posts/post-getall");
    const data = await response.json();
    if (data.success) {
      setPosts(data.allPosts);
    }
    console.log(data);
  };

  return { posts };
};

export default MainMV;
