import api from "@/api";
import RootStore from "./root.store";
import cookieManager from "@/utils/cookies";
import { makeAutoObservable } from "mobx";

export default class AuthStore {
  private readonly rootStore: RootStore;

  error: string | null = null;
  username: string = "";
  password: string = "";

  loading = false;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);
  }

  public setUsername = (username: string) => {
    this.username = username;
  };

  public setPassword = (password: string) => {
    this.password = password;
  };

  private setError = (error: string | null) => {
    this.error = error;
  };

  login = async (
    event: React.FormEvent<HTMLFormElement>,
    push: (href: string) => void
  ) => {
    event.preventDefault();

    try {
      const result = await api.login({
        username: this.username,
        password: this.password,
      });

      const { token, refreshToken } = result.data;
      api.setAccessToken(token);
      api.setRefreshToken(refreshToken);
      push("/dashboard");
    } catch (err) {
      console.log("[Error-onSubmit]:", err);
      this.setError("Invalid username or password");
    }
  };

  logout = (push: (href: string) => void) => {
    api.clearAccessToken();
    api.clearRefreshToken();
    push("/login");
  };

  get isAuthenticated(): boolean {
    this.loading = true;
    const token = cookieManager.getCookie("token");
    this.loading = false;
    return !!token;
  }
}
