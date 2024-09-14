import Cookies from "js-cookie";

class CookieManager {
  public setCookie = (
    name: string,
    value: string,
    options?: { expires?: number | Date; secure?: boolean; path?: string }
  ): void => {
    // Default options for the cookie
    const defaultOptions = {
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      path: "/",
      ...options, // Merge with provided options
    };

    Cookies.set(name, value, defaultOptions);
  };

  public getCookie = (name: string): string | undefined => {
    return Cookies.get(name);
  };

  public removeCookie = (name: string, options?: { path?: string }): void => {
    Cookies.remove(name, options);
  };
}

const cookieManager = new CookieManager();

export default cookieManager;
