import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Grid,
} from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const { data, isLoading, error } = useProducts();
  const navigate = useNavigate();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error loading products</Text>;
  }
  const total = data?.products.length
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>
      <Text c="dimmed">{total} products found</Text>
      <Grid>
      {data?.products.map((product) => (
        <Grid.Col span={4} key={product.id}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src={product.thumbnail}
                height={160}
                alt={product.title}
                fit="cover"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{product.title}</Text>
              <Badge color="pink">${product.price}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {product.description}
            </Text>
            <Group gap="xs">
              <Text size="sm">Stock: {product.stock}</Text>
              <Text size="sm">Rating: {product.rating}</Text>
            </Group>
            <Button color="blue" fullWidth mt="md" onClick={()=>navigate(`/products/${product.id}`)}>
              Details
            </Button>
          </Card>
        </Grid.Col>
        
      ))}
      </Grid>
    </Container>
  );
};

export default Products;
