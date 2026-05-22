import {
  Button,
  Card,
  Container,
  Group,
  Table,
  Title,
  Text,
} from "@mantine/core";

import { useCart } from "./hooks/useCart";

import type { CartItem } from "./type/cartItem";
import { useEffect, useState } from "react";
import { useRemoveCartItem } from "./hooks/useRemoveCartItem";
import { useClearCart } from "./hooks/useClearCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { data, isLoading, error } = useCart();
  const removeCartItem = useRemoveCartItem();
  const clearCartItem = useClearCart();
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  useEffect(() => {
    if (data) {
      setCartProducts(data.carts[0].products);
    }
  }, [data]);
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Failed to load cart</div>;
 

  const total = cartProducts.reduce((sum, product) => sum + product.total, 0);
  const cart = data.carts[0];
  const products = cart.products;

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
          {cartProducts.map((product: CartItem) => (
            <tr key={product.id}>
              <Table.Td>Product #{product.id}</Table.Td>
              <Table.Td>${product.price}</Table.Td>
              <Table.Td>{product.quantity}</Table.Td>
              <Table.Td>${product.total}</Table.Td>

              <td>
                <Button
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
              variant="outline"
              color="red"
              onClick={() => clearCartItem.mutate()}
            >
              Clear Cart
            </Button>

            <Button onClick={()=>navigate("/products")} size="lg">Continue Shopping</Button>
          </Group>
        </Card>
      </Group>
    </Container>
  );
};

export default Cart;
