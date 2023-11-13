"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    await signIn("Credentials", {
      password,
      email,
      callbackUrl: "/transactions",
    });
  };

  return (
    <div>
      <label>
        Email
        <input
          name="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" onClick={onSubmit}>
        Sign in!
      </button>
    </div>
  );
}
