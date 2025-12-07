export const pageTypes = {
  Login: "Login",
  Home: "Home",
  Profile: "Profile",
} as const;
export type PageType = keyof typeof pageTypes;
