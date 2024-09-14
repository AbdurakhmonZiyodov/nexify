"use client";

import styles from "./login.module.css";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/store/root.store";
import { useRouter } from "next/navigation";

function Login() {
  const {
    setPassword,
    setUsername,
    password,
    username,
    login,
    loginOperation,
  } = rootStore.auth;
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        {loginOperation.isError ? (
          <p className={styles.error}>
            {loginOperation.error as React.ReactNode}
          </p>
        ) : null}
        <form className="space-y-4" onSubmit={(event) => login(event, push)}>
          <div>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            disabled={loginOperation.isInProgress}
            className={styles.button}
          >
            {loginOperation.isInProgress ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default observer(Login);
