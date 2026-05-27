import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Loader,
  Center,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useParams } from "react-router-dom";
import { useAddCartItem } from "../../cart/pages/hooks/useAddCart";
import { useContext } from "react";
import { AuthContext } from "../../auth/pages/context/AuthContext";
const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(Number(id));

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not found");
  const { user } = auth;
  const addCartItem = useAddCartItem(user?.id);
  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  if (error || !product) {
    return <Text>Error loading products</Text>;
  }
  const cartItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
    total: product.price,
    discountPercentage: product.discountPercentage,
    discountedTotal: product.price,
    thumbnail: product.thumbnail,
  };
  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image src={product.thumbnail} alt={product.title} height={400} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={1} mb="md">
            {product.title}
          </Title>
          <Group mb="md">
            <Badge size="lg" color="pink">
              ${product.price}
            </Badge>
            <Badge size="lg" color="blue">
              {product.category}
            </Badge>
            <Badge color="red" size="lg">
              -{product.discountPercentage?.toFixed()}% OFF
            </Badge>
          </Group>
          <Text size="lg" mb="md">
            {product.description}
          </Text>

          <Text size="md" mb="xl" c="dimmed">
            Stock: {product.stock} units available
          </Text>
          <Group>
            <Button
              loading={addCartItem.isPending}
              size="lg"
              onClick={() => {
                if (!user) {
                  navigate("/login");
                  return;
                }
                addCartItem.mutate(cartItem);
              }}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Title order={2} mt="xl" mb="md">
        Reviews
      </Title>

      {product.reviews?.map((review, index) => (
        <Box
          key={index}
          p="md"
          mb="md"
          style={{
            border: "1px solid #e9ecef",
            borderRadius: "8px",
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text fw={600}>{review.reviewerName}</Text>
            <Text>{review.rating}/5</Text>
          </Group>

          <Text mb="xs">{review.comment}</Text>

          <Text size="sm" c="dimmed">
            {new Date(review.date).toLocaleDateString()}
          </Text>
        </Box>
      ))}
    </Container>
  );
};

export default ProductDetail;
