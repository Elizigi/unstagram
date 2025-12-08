import { useEffect, useState } from "react";
import type { Post } from "../../model/postModel";

const UserProfileMV = (userId: number) => {
  const [profileName, setProfileName] = useState();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchProfile = async (userId: number) => {
      const response = await fetch(
        `http://localhost:3000/api/users/user-profile/${userId}`,
        { credentials: "include" }
      );
      const data = await response.json();
      console.log(data);
      if (data.profile.user_name) {
        setProfileName(data.profile.user_name);
        setPosts(data.profile.posts);
        setIsFollowed(Boolean(data.profile.followed_by_me));
      }
    };
    fetchProfile(userId);
  }, [userId]);

  const followUser = async (followed_id: number) => {
    const prev = isFollowed;

    try {
      setIsFollowed(!isFollowed);
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
        setIsFollowed(prev);
        throw new Error("something went wrong deleting post");
      }
    } catch (error) {
      setIsFollowed(prev);
      console.error("Error deleting post", error);
    }
  };
  return { profileName, posts, isFollowed, followUser };
};

export default UserProfileMV;
