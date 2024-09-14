"use client";
import { observer } from "mobx-react-lite";
import Users from "@/components/Users";
import Todos from "@/components/Todos";
import Posts from "@/components/Posts";
import Products from "@/components/Products";
import { rootStore } from "@/store/root.store";
import { DashboardTabs } from "@/store/dashboard.store";

function Content({ className }: { className?: string }) {
  const { tab, users, posts, products, todos } = rootStore.dashboard;

  return (
    <div className={className}>
      {tab === DashboardTabs.USERS && <Users users={users} />}
      {tab === DashboardTabs.POSTS && <Posts posts={posts} />}
      {tab === DashboardTabs.PRODUCTS && <Products products={products} />}
      {tab === DashboardTabs.TODOS && <Todos todos={todos} />}
    </div>
  );
}

export default observer(Content);
