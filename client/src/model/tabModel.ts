export const currentTabOptions = {
  following: "following",
  discover: "discover",
} as const;
export type CurrentTab =
  (typeof currentTabOptions)[keyof typeof currentTabOptions];
