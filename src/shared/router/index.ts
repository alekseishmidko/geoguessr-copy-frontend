export const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
type Props = {
  root: (url?: string) => string;
  home: () => string;
  box: () => string;
  bird: () => string;
  balloon: () => string;
};
export const PRIVATE_URL: Props = {
  root: (url = "") => `${url ? url : ""}`,
  home: () => PRIVATE_URL.root("/"),
  box: () => PRIVATE_URL.root(`/box`),
  bird: () => PRIVATE_URL.root(`/bird`),
  balloon: () => PRIVATE_URL.root(`/balloon`),
};
