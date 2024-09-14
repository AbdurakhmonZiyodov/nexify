import api from "@/api";
import RootStore from "./root.store";
import cookieManager from "@/utils/cookies";
import { makeAutoObservable } from "mobx";
import { Operation } from "@/utils/Operation";
import { LoginResponse, User } from "@/api/api.types";

export default class AuthStore {
  private readonly rootStore: RootStore;

  public username: string = "";
  public password: string = "";
  public loginOperation = new Operation<LoginResponse>({} as LoginResponse);
  private getMeOperation = new Operation<User>({} as User);

  loadingOfCookies = false;

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

  public login = async (
    event: React.FormEvent<HTMLFormElement>,
    push: (href: string) => void
  ) => {
    event.preventDefault();

    await this.loginOperation.run(() =>
      api.login({
        username: this.username,
        password: this.password,
      })
    );

    if (this.loginOperation.isSuccess) {
      const { token, refreshToken } = this.loginOperation.data;
      api.setAccessToken(token);
      api.setRefreshToken(refreshToken);
      push("/dashboard");
    }
  };

  public logout = (push: (href: string) => void) => {
    api.clearAccessToken();
    api.clearRefreshToken();
    push("/login");
  };

  public getMe = async () => {
    await this.getMeOperation.run(api.me);
  };

  public get user(): User {
    return this.getMeOperation.data || ({} as User);
  }

  public get isAuthenticated(): boolean {
    this.loadingOfCookies = true;
    const token = cookieManager.getCookie("token");
    this.loadingOfCookies = false;
    return !!token;
  }
}
