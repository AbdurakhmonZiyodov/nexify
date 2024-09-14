"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { signIn, useSession } from "next-auth/react";

const initialFormState = {
  username: "",
  password: "",
};
export default function Login() {
  const session = useSession();
  const [{ username, password }, setFormState] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const result = await signIn("credentials", {
          redirect: false,
          username,
          password,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        console.log("[Error-onSubmit]:", err);
        setError("Invalid username or password");
      }
    },
    [username, password, router]
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChangeInput}
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
              onChange={onChangeInput}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        <pre>{JSON.stringify({ session }, null, 2)}</pre>
      </div>
    </div>
  );
}
