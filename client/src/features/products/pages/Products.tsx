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
  Loader,
  Center,
  Select,
} from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { ProductSidebarFilters } from "../components/ProductSidebarFilters";
const Products = () => {
  const { data, isLoading, error } = useProducts();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  if (error) {
    return <Text>Error loading products</Text>;
  }
  const total = data?.products.length;
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>

      <Grid>
        <Grid.Col span={3}>
          <ProductSidebarFilters />
        </Grid.Col>

        <Grid.Col span={9}>
          <Group justify="space-between" mb="md">
            <Text c="dimmed">{total} products found</Text>

            <Select
              data={["Price (Low to High)", "Price (High to Low)","Rating (High to Low)", "Name (A-Z)"]}
              defaultValue="Price (Low to High)"
            />
          </Group>

          <Grid>
            {data?.products.map((product) => (
              <Grid.Col span={4} key={product.id}>
                <Card
                  h="100%"
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Card.Section>
                    <Image src={product.thumbnail} height={180} fit="contain" />
                  </Card.Section>

                  <Group justify="space-between" mt="md">
                    <Text fw={600} lineClamp={1}>
                      {product.title}
                    </Text>

                    <Badge color="pink">${product.price}</Badge>
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={2} mt="sm">
                    {product.description}
                  </Text>

                  <Group mt="sm">
                    <Text size="sm">Stock: {product.stock}</Text>
                    <Text size="sm">Rating: {product.rating}</Text>
                  </Group>

                  <Button
                    color="blue"
                    fullWidth
                    mt="auto"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View Details
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Products;
