import { useState } from "react";

export function useAuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return {
    username,
    setUsername,
    password,
    setPassword,
    submitted,
    setSubmitted,
  };
}