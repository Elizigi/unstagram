import { useEffect, useState } from "react";
import type { Post } from "../model/postModel";

const MainMV = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postStatus, setPostStatus] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setPostStatus(""), 5000);
    return () => clearTimeout(timer);
  }, [postStatus]);
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/posts/post-getall",
        { credentials: "include" }
      );
      const data = await response.json();
      if (data.success && Array.isArray(data.allPosts)) {
        setPosts([...data.allPosts]);
      }
      console.log(data);
    } catch (error) {
      console.error("Error Occurred", error);
    }
  };

  const likePost = async (postId: number) => {
    try {
      const updatedPosts = posts.map((post) => {
        if (post.post_id !== postId) return post;

        console.log("BEFORE UPDATE:", {
          postId: post.post_id,
          liked_by_me: post.liked_by_me,
          likes_count: post.likes_count,
        });

        const isLiked = Number(post.liked_by_me) === 1;
        const newLikesCount = post.likes_count ?? 0;

        const updated = {
          ...post,
          liked_by_me: isLiked ? 0 : 1,
          likes_count: isLiked ? newLikesCount - 1 : newLikesCount + 1,
        };

        console.log("AFTER UPDATE:", {
          postId: updated.post_id,
          liked_by_me: updated.liked_by_me,
          likes_count: updated.likes_count,
        });

        return updated;
      });
      setPosts(updatedPosts);
      const response = await fetch(
        "http://localhost:3000/api/posts/post-like",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ postId }),
        }
      );
      const data = await response.json();
      if (data.success && Array.isArray(data.allPosts)) {
        setPosts([...data.allPosts]);
      }
      console.log(data.allPosts);
    } catch (error) {
      console.error("Error Occurred", error);
    }
  };
  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const postTitle = data.get("title") as string;
    const postDescription = data.get("description") as string;
    const postUrl = data.get("url") as string;
    if (postTitle === "") return;
    reqCreatePost(postTitle, postDescription, postUrl, form);
  };
  const reqCreatePost = async (
    postTitle: string,
    postDescription: string,
    postUrl: string,
    form: EventTarget & HTMLFormElement
  ) => {
    try {
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
        form.reset();
        setPostStatus("Post Created");
        fetchPosts();
      }
    } catch (error) {
      console.error("error has occurred", error);
      setPostStatus("Error Creating Post");
    }
  };
  return { posts, postStatus, createPost, likePost };
};

export default MainMV;
