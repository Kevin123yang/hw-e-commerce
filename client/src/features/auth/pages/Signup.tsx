import {
  Card,
  Container,
  Title,
  Alert,
  Text,
  Group,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const fakeSignup = async () => {
  await new Promise((res) => setTimeout(() => res(null), 1000));
  throw new Error("Invalid credentials");
};
const Signup = () => {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkError, setCheckError] = useState(false);
  const isEmailValid = /^\S+@\S+\.\S{2,}$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isUsername = username.length >= 3;
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: fakeSignup,
  });
  const handleSignUp = () => {
    setSubmitted(true);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !isEmailValid ||
      !isPasswordValid ||
      !isUsername
    ) {
      return;
    }

    mutation.mutate();
  };

  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <form onSubmit={handleSignUp}>
          <Title order={2} mb="md" ta="center">
            Create an account
          </Title>
          <Alert color="yellow" variant="light" mb="md">
            <Text size="sm" c="dark">
              DummyJSON does not support real user registration. Use an existing
              test account on the Login page instead.
            </Text>
          </Alert>
          {mutation.isError && (
            <Alert color="red" mb="md">
              Invalid credentials
            </Alert>
          )}
          <Group grow mb="md">
            <TextInput
              label="First name"
              placeholder="Jane"
              error={
                submitted && !firstName.trim() ? "First name is required" : ""
              }
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              label="Last name"
              placeholder="Doe"
              error={
                submitted && !lastName.trim() ? "Last name is required" : ""
              }
              onChange={(e) => setLastName(e.target.value)}
            />
          </Group>
          <TextInput
            label="Username"
            placeholder="janedoe"
            mb="md"
            error={
              submitted && !isUsername
                ? "Username must be at least 3 characters"
                : ""
            }
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInput
            label="Email"
            placeholder="jane@example.com"
            mb="md"
            type="email"
            error={submitted && !isEmailValid ? "Invalid email address" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="At least 6 characters"
            mb="md"
            error={
              submitted && !isPasswordValid
                ? "Password must be at least 6 characters"
                : ""
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            mb="md"
            loading={mutation.isPending}
            onClick={() => mutation.reset()}
            fullWidth
          >
            Sign up
          </Button>
          <Text ta="center" c="dimmed" mt="sm">
            Already have an account?{" "}
            <Anchor onClick={() => navigate("/login")}>Log in</Anchor>
          </Text>
        </form>
      </Card>
    </Container>
  );
};

export default Signup;
