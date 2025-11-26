import { useState } from "react";
import type { Post } from "../model/postModel";

const MainMV = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  return { posts };
};

export default MainMV;
