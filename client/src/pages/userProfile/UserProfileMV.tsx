import { useEffect, useState } from "react";
import type { Post } from "../../model/postModel";

const UserProfileMV = (userId: number) => {
  const [profileName, setProfileName] = useState();
  const [posts, setPosts] = useState<Post[]>([]);

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
      }
    };
    fetchProfile(userId);
  }, [userId]);
  return { profileName, posts };
};

export default UserProfileMV;
