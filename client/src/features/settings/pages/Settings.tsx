import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";
import type { UpdateUserInput } from "../type/user";

export default function Settings() {
  const initialData: UpdateUserInput = {
    firstName: "Emily",
    lastName: "Johnson",
    username: "emilys",
    email: "emily.johnson@x.dummyjson.com",
    phone: "+81 965-431-3024",
  };
  const [successMessage, setSuccessMessage] = useState("");
  const updateUser = useUpdateUser();
  const [lastSavedData, setLastSavedData] =
    useState<UpdateUserInput>(initialData);

  const [formData, setFormData] = useState<UpdateUserInput>(initialData);
  const isUnchanged = JSON.stringify(formData) === JSON.stringify(lastSavedData);

  const handleChange = (field: keyof UpdateUserInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSuccessMessage("");
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateUser.mutate(formData, {
      onSuccess: () => {
        setLastSavedData(formData);
        setSuccessMessage("Profile updated.");
      },
    });
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb={50} size={56}>
        Settings
      </Title>

      <Card shadow="sm" padding={48} radius="md" withBorder>
        <Title order={2} mb="xl">
          Profile
        </Title>

        {successMessage && (
          <Text c="green" mb="lg">
            {successMessage}
          </Text>
        )}

        <form onSubmit={handleSave}>
          <Grid >
            <Grid.Col span={6}>
              <TextInput
                label="First name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                size="md"
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Last name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                size="md"
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                size="md"
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                size="md"
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                size="md"
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt={48}>
            <Button
              size="md"
              disabled={isUnchanged}
              type="submit"
              loading={updateUser.isPending}
            >
              Save changes
            </Button>
          </Group>
        </form>
      </Card>
    </Container>
  );
}
