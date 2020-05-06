import cookie from "cookie_js";
export function getCookie(key) {
  return cookie.get(key);
}
export function setCookie(key, value) {
  return cookie.set(key, value);
}
export function removeCookie(key) {
  return cookie.remove(key);
}
