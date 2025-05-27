import { ParsedUrlQuery } from "querystring";

export const flattenQuery = (query: ParsedUrlQuery): Record<string, string> => {
  const flattened: Record<string, string> = {};
  Object.keys(query).forEach((key) => {
    const value = query[key];
    // If the value is an array, take the first value or join them
    flattened[key] = Array.isArray(value) ? value[0] : value || "";
  });
  return flattened;
};
export function checkMail(value: string) {
  const Regx =
    /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
  return Regx.test(value);
}
export const appendQueryParams = (url: string, asPath: string) => {
  const currentQuery = asPath.split("?")[1];
  if (currentQuery) {
    return `${url}${url.includes("?") ? "&" : "?"}${currentQuery}`;
  }
  return url;
};
export function randomString() {
  const characters = "abcdefghijklmnopqrstuvwxyz123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}
export const setPermanentCookie = (
  name: string,
  value: string,
  years: number
) => {
  let expires = "";
  if (years) {
    const date = new Date();
    date.setTime(date.getTime() + years * 365 * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${
    value || ""
  }${expires}; path=/; Secure; SameSite=Strict`;
};
export const isFacebookOrInstagramBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.includes("fban") ||
    userAgent.includes("fbav") ||
    userAgent.includes("instagram")
  );
};
