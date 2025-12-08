import type { Post } from "../../model/postModel";
import { currentTabOptions, type CurrentTab } from "../../model/tabModel";

const PostCompMv = (
  posts: Post[],
  currentTab: CurrentTab,
  setPosts: (posts: Post[]) => void,
  fetchPosts: () => void,
  fetchFollowed: () => void
) => {
  const deletePost = async (post_id: number) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/posts/post-delete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ post_id }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error("something went wrong deleting post");
      }
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };
  const likePost = async (postId: number) => {
    const oldPosts = [...posts];
    try {
      const updatedPosts = posts.map((post) => {
        if (post.post_id !== postId) return post;

        const isLiked = Number(post.liked_by_me) === 1;
        const newLikesCount = post.likes_count ?? 0;

        const updated = {
          ...post,
          liked_by_me: isLiked ? 0 : 1,
          likes_count: isLiked ? newLikesCount - 1 : newLikesCount + 1,
        };

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
      if (!data.success) {
        setPosts(oldPosts);
      }
    } catch (error) {
      console.error("Error Occurred", error);
      setPosts(oldPosts);
    }
  };
  const followUser = async (followed_id: number) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/user-follow",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ followed_id }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error("something went wrong deleting post");
      }
      if (currentTab === currentTabOptions.following) {
        fetchFollowed();
        return;
      }
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };
  return { deletePost, followUser, likePost };
};

export default PostCompMv;
