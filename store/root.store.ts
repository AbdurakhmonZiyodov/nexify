import { makeAutoObservable } from "mobx";
import AuthStore from "./auth.store";
import DashboardStore from "./dashboard.store";

export default class RootStore {
  auth: AuthStore;
  dashboard: DashboardStore;

  constructor() {
    makeAutoObservable(this);
    this.auth = new AuthStore(this);
    this.dashboard = new DashboardStore(this);
  }

  public didMount = async () => {
    await this.auth.getMe();
    await this.dashboard.fetchAllData();
  };
}

export const rootStore = new RootStore();
