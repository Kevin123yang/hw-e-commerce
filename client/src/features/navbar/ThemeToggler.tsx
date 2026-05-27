import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon } from '@tabler/icons-react';

export const ThemeToggler = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      variant="subtle"
      color="blue"
      size="lg"
      radius="md"
      aria-label="Toggle color scheme"
      onClick={() => toggleColorScheme()}
    >
      <IconMoon size={20} stroke={1.5} />
    </ActionIcon>
  );
};
