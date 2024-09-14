import Axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { LoginResponse, Post, Product, Todo, User } from "./api.types";
import { API_REQUEST_TIMEOUT, API_URL } from "./api.constants";
import cookieManager from "@/utils/cookies";
import { DAY } from "@/utils/date";

// Extend the InternalAxiosRequestConfig interface
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class Api {
  private readonly axios: AxiosInstance;

  // URLs for API endpoints
  private readonly urls = {
    // Auth
    refresh: "/auth/refresh",
    login: "/auth/login",
    me: "/auth/me",

    allUsers: "/users",
    allProducts: "/products",
    allPosts: "/posts",
    allTodos: "/todos",
  };

  constructor() {
    this.axios = Axios.create({
      baseURL: API_URL,
      timeout: API_REQUEST_TIMEOUT,
    });

    // Request interceptor
    this.axios.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const token = cookieManager.getCookie("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh the token
            const refreshResponse = await this.refreshToken();
            if (refreshResponse.status === 200) {
              const { accessToken } = refreshResponse.data;
              this.setAccessToken(accessToken); // Save the new token

              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return this.axios(originalRequest);
            }
          } catch (refreshError) {
            // Token refresh failed, clear tokens and redirect to login
            this.clearAccessToken();
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public setAccessToken = (accessToken: string) => {
    cookieManager.setCookie("token", accessToken, {
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });
  };

  public clearAccessToken = () => {
    cookieManager.removeCookie("token");
    this.clearRefreshToken();
  };

  public setRefreshToken = (refreshToken: string) => {
    cookieManager.setCookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 30 * DAY), // 30 days
    });
  };

  public clearRefreshToken = () => {
    cookieManager.removeCookie("refreshToken");
  };

  // Auth methods
  public login = async (credentials: {
    username: string;
    password: string;
  }): Promise<AxiosResponse<LoginResponse>> => {
    return this.axios.post<LoginResponse>(this.urls.login, credentials);
  };

  public me = async (): Promise<AxiosResponse> => {
    return this.axios.get(this.urls.me);
  };

  private async refreshToken(): Promise<AxiosResponse> {
    return this.axios.post(
      this.urls.refresh,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookieManager.getCookie("refreshToken")}`, // Ensure refresh token is managed
        },
      }
    );
  }

  // User methods
  public getAllUsers = async (): Promise<AxiosResponse<{ users: User[] }>> => {
    return this.axios.get<{ users: User[] }>(this.urls.allUsers);
  };

  // Product methods
  public getAllProducts = async (): Promise<
    AxiosResponse<{ products: Product[] }>
  > => {
    return this.axios.get<{ products: Product[] }>(this.urls.allProducts);
  };

  // Post methods
  public getAllPosts = async (): Promise<AxiosResponse<{ posts: Post[] }>> => {
    return this.axios.get<{ posts: Post[] }>(this.urls.allPosts);
  };

  // Todo methods
  public getAllTodos = async (): Promise<AxiosResponse<{ todos: Todo[] }>> => {
    return this.axios.get<{ todos: Todo[] }>(this.urls.allTodos);
  };
}

const api = new Api();

export default api;
