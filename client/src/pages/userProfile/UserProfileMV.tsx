import { useEffect, useState } from "react";

const UserProfileMV = (userId: number) => {
  const [profileName, setProfileName] = useState();

  useEffect(() => {
    const fetchProfile = async (userId: number) => {
      const response = await fetch(
        `http://localhost:3000/api/users/user-profile/${userId}`,
        { credentials: "include" }
      );
      const data = await response.json();
      console.log(data);
      if (data.name) {
        setProfileName(data.name);
      }
    };
    fetchProfile(userId);
  }, [userId]);
  return { profileName };
};

export default UserProfileMV;
