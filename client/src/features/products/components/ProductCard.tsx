import { Badge, Button, Card, Group, Text,Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


export const ProductCard = ({ product }: { product: any }) => {
  const navigate = useNavigate();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Card.Section>
        <Image src={product.thumbnail} alt={product.title} height={160} />
      </Card.Section>

      <Group justify="space-between" mt="md" wrap="nowrap">
        <Text fw={700} lineClamp={1} style={{ flex: 1 }}>
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
  );
};
