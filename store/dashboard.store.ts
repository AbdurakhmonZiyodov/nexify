import { makeAutoObservable } from "mobx";
import api from "@/api";
import { Post, Product, Todo, User } from "@/api/api.types";
import RootStore from "./root.store";
import { Operation } from "@/utils/Operation";

export enum DashboardTabs {
  USERS = "Users",
  POSTS = "Posts",
  PRODUCTS = "Products",
  TODOS = "Todos",
}

export default class DashboardStore {
  private getAllUsersOperation = new Operation<{
    users: User[];
  }>({ users: [] });
  private getAllPostsOperation = new Operation<{
    posts: Post[];
  }>({ posts: [] });
  private getAllProductsOperation = new Operation<{
    products: Product[];
  }>({ products: [] });
  private getAllTodosOperation = new Operation<{
    todos: Todo[];
  }>({ todos: [] });

  public tab: DashboardTabs = DashboardTabs.USERS;

  private readonly rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);
  }

  private fetchUsers = async () => {
    await this.getAllUsersOperation.run(() => api.getAllUsers());
  };

  private fetchPosts = async () => {
    await this.getAllPostsOperation.run(() => api.getAllPosts());
  };

  private fetchProducts = async () => {
    await this.getAllProductsOperation.run(() => api.getAllProducts());
  };

  private fetchTodos = async () => {
    await this.getAllTodosOperation.run(() => api.getAllTodos());
  };

  public get users(): User[] {
    return this.getAllUsersOperation.data.users;
  }

  public get posts(): Post[] {
    return this.getAllPostsOperation.data.posts;
  }

  public get products(): Product[] {
    return this.getAllProductsOperation.data.products;
  }

  public get todos(): Todo[] {
    return this.getAllTodosOperation.data.todos;
  }

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
