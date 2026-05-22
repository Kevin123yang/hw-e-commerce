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
        <Title order={2} mb="xl" ta="center">
          Login
        </Title>
        {mutation.isError && (
          <Alert color="red" mb="md">
            Invalid username or password
          </Alert>
        )}
        <TextInput
          label="Username"
          placeholder="emilys"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <PasswordInput
          mt="md"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          mt="xl"
          onClick={() => mutation.mutate({ username, password })}
        >
          Login
        </Button>
        <Text ta="center" c="dimmed" mt="md">
          Try: <strong>emilys</strong> / <strong>emilyspass</strong>
        </Text>

        <Text ta="center" c="dimmed" mt="sm">
          Don't have an account? <Anchor href="/signup">Sign up</Anchor>
        </Text>
      </Card>
    </Container>
  );
};

export default Login;
