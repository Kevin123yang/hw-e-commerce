import {
  Button,
  Card,
  Container,
  Group,
  Table,
  Title,
  Text,
  Center,
  Loader,
} from "@mantine/core";

import { useCart } from "./hooks/useCart";

import type { CartItem } from "./type/cartItem";
import { useRemoveCartItem } from "./hooks/useRemoveCartItem";
import { useClearCart } from "./hooks/useClearCart";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/pages/context/AuthContext";

const Cart = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContent not found");
  const { user } = auth;

  const { data, isLoading, error } = useCart(user?.id);
  const removeCartItem = useRemoveCartItem(user?.id);
  const clearCartItem = useClearCart(user?.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    navigate("/products");
  };
  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (error) return <div>Failed to load cart</div>;
  const products = data?.carts?.[0]?.products ?? [];

  const total = products.reduce(
    (sum: number, product: CartItem) => sum + product.total,
    0
  );

  if (products.length === 0) {
    return (
      <Container size="md" py="xl">
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={2} mb="md">
            Your Cart is Empty
          </Title>

          <Text mb="xl">Start shopping to add items to your cart!</Text>

          <Button fullWidth onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </Card>
      </Container>
    );
  }
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Shopping Cart
      </Title>

      <Table striped="odd" highlightOnHover verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "35%" }}>Product</Table.Th>
            <Table.Th style={{ width: "20%" }}>Price</Table.Th>
            <Table.Th style={{ width: "15%" }}>Quantity</Table.Th>
            <Table.Th style={{ width: "20%" }}>Subtotal</Table.Th>
            <Table.Th style={{ width: "10%" }}>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <tbody>
          {products.map((product: CartItem) => (
            <tr key={product.id}>
              <Table.Td>Product #{product.id}</Table.Td>
              <Table.Td>${product.price}</Table.Td>
              <Table.Td>{product.quantity}</Table.Td>
              <Table.Td>${product.total}</Table.Td>

              <td>
                <Button
                  loading={removeCartItem.isPending}
                  onClick={() => removeCartItem.mutate(product.id)}
                  color="red"
                  size="xs"
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Group justify="flex-end" mt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">
            Total: ${total.toFixed(2)}
          </Title>

          <Group>
            <Button
              loading={clearCartItem.isPending}
              variant="outline"
              color="red"
              onClick={() => clearCartItem.mutate()}
            >
              Clear Cart
            </Button>

            <Button loading={loading} onClick={handleContinue} size="lg">
              Continue Shopping
            </Button>
          </Group>
        </Card>
      </Group>
    </Container>
  );
};

export default Cart;
