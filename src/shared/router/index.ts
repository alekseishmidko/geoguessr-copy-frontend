export const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export const PRIVATE_URL = {
  root: (url = "") => `${url ? url : ""}`,
  home: () => PRIVATE_URL.root("/"),
  box: () => PRIVATE_URL.root(`/box`),
  bird: () => PRIVATE_URL.root(`/bird`),
};
