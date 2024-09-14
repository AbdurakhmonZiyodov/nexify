import { makeAutoObservable } from "mobx";
import api from "@/api";
import { Post, Product, Todo, User } from "@/api/api.types";
import RootStore from "./root.store";

export enum DashboardTabs {
  USERS = "Users",
  POSTS = "Posts",
  PRODUCTS = "Products",
  TODOS = "Todos",
}

export default class DashboardStore {
  public users: User[] = [];
  public posts: Post[] = [];
  public products: Product[] = [];
  public todos: Todo[] = [];
  public tab: DashboardTabs = DashboardTabs.USERS;

  private readonly rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);
  }

  private fetchUsers = async () => {
    const users = await api.getAllUsers();
    this.users = users.data.users;
  };

  private fetchPosts = async () => {
    const posts = await api.getAllPosts();
    this.posts = posts.data.posts;
  };

  private fetchProducts = async () => {
    const products = await api.getAllProducts();
    this.products = products.data.products;
  };

  private fetchTodos = async () => {
    const todos = await api.getAllTodos();
    this.todos = todos.data.todos;
  };

  public fetchAllData = async () => {
    try {
      await Promise.all([
        this.fetchUsers(),
        this.fetchPosts(),
        this.fetchProducts(),
        this.fetchTodos(),
      ]);
    } catch (error) {
      console.error("Failed to fetch all data:", error);
    }
  };

  setTab = async (tab: DashboardTabs) => {
    this.tab = tab;
  };
}
