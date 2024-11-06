export function createCookie(key, value) {
  document.cookie = `${key}=${value}; path=/`;
}

export function getCookie(key) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];
}

export function clearCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure`;
}
