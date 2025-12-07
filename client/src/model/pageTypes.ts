export const pageTypes = {
  login: "login",
  home: "home",
  profile: "profile",
} as const;
export type PageType = keyof typeof pageTypes;
