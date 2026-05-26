import { Avatar, Button, Group, Indicator, Menu, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "./SearchBar";
import { ThemeToggler } from "./ThemeToggler";
import { useContext } from "react";
import { AuthContext } from "../auth/pages/context/AuthContext";
import { IconLogin } from "@tabler/icons-react";
import { useCart } from "../cart/pages/hooks/useCart";
import type { CartItem } from "../cart/pages/type/cartItem";
import { useQueryClient } from "@tanstack/react-query";

export const Navbar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const { user, logout } = auth;
  const { data } = useCart(user?.id);
  const carts = data?.carts?.[0]?.products ?? [];
  const cartCount = carts.reduce(
    (sum: number, product: CartItem) => sum + product.quantity,
    0
  );

  const handleCartClick = () => {
    navigate("/cart");
  };
  return (
    <Group
      justify="space-between"
      p="md"
      style={{ borderBottom: "1px solid #e9ecef" }}
    >
      <Text
        size="xl"
        fw={700}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        E-Commerce Store
      </Text>

      <SearchBar />

      <Group>
        <ThemeToggler />
        <Indicator
          label={cartCount}
          size={16}
          color="red"
          position="middle-start"
        >
          <Button
            variant="subtle"
            leftSection={<IconShoppingCart size={18} />}
            onClick={handleCartClick}
          >
            Cart
          </Button>
        </Indicator>

        {user ? (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="subtle"
                rightSection={<IconChevronDown size={16} />}
              >
                <Group gap="xs">
                  <Avatar src="" alt="User" size="sm" />
                  <Text size="sm">{user.username}</Text>
                </Group>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={<IconSettings size={16} />}
                onClick={() => navigate("/settings")}
              >
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout size={16} />}
                color="red"
                onClick={() => {
                  queryClient.removeQueries({ queryKey: ["cart"] });
                  navigate("/");
                  logout();
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            leftSection={<IconLogin size={18} />}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Group>
    </Group>
  );
};
