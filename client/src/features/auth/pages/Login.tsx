import {
  Card,
  Container,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Text,
  Alert,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";

import { useContext, useState } from "react";
import { loginApi } from "./api/ authApi";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext not found");
  }
  const { login } = auth;
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.username);
      navigate("/");
    },
  });
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) return
    setSubmitted(true)
    mutation.mutate({
      username,
      password,
    });
  };

  return (
    <Container size="xs" py="xl">
      <Card
        shadow="md"
        padding="xl"
        radius="md"
        withBorder
        style={{
          width: 500,
        }}
      >
        <form onSubmit={handleLogin}noValidate>
        <Title order={2} mb="xl" ta="center">
          Login
        </Title>
        {mutation.isError && (
          <Alert color="red" mb="md">
            Invalid credentials
          </Alert>
        )}
        <TextInput
          label="Username"
          placeholder="emilys"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={
            submitted && !username.trim()
              ? "Username is required"
              : ""
          }
        />

        <PasswordInput
          mt="md"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={
            submitted && !password.trim()
              ? "Password is required"
              : ""
          }
        />

        <Button
          fullWidth
          mt="xl"
          type="submit"
          onClick={()=> mutation.reset()}
          loading={mutation.isPending}
        >
          Login
        </Button>
        <Text ta="center" c="dimmed" mt="md">
          Try: <strong>emilys</strong> / <strong>emilyspass</strong>
        </Text>

        <Text ta="center" c="dimmed" mt="sm">
          Don't have an account? <Anchor onClick={()=>navigate("/signup")}>Sign up</Anchor>
        </Text>
        </form>
      </Card>
      
    </Container>
  );
};

export default Login;
