import {
  Container,
  Text,
  Group,
  Title,
  Grid,
  Loader,
  Center,
  Select,
} from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { ProductSidebarFilters } from "../components/ProductSidebarFilters";
import { ProductCard } from "../components/ProductCard";
import useProductFilters from "../../navbar/hooks/useProductFilters";
import { useState } from "react";
const Products = () => {
  const { data, isLoading, error } = useProducts();
  const { category, minPrice, rating, onSale, search } = useProductFilters();

  const [sortBy, setSortBy] = useState("Price (Low to High)");
  const products = data?.products || [];
  const filtersCategories = products.filter((product) => {
    const matchCategory =
      category === "All Categories" || category === product.category;
    const matchPrice = minPrice <= product.price;
    const matchRating = rating <= product.rating || rating === 0;
    const matchOnSale = product.discountPercentage > 0 || !onSale;
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return (
      matchCategory && matchPrice && matchRating && matchOnSale && matchSearch
    );
  });
  const sortedFiltersCategories = [...filtersCategories];
  sortedFiltersCategories.sort((a, b) => {
    if (sortBy === "Name (A-Z)") return a.title.localeCompare(b.title);

    if (sortBy === "Price (Low to High)") return a.price - b.price;

    if (sortBy === "Price (High to Low)") return b.price - a.price;
    if (sortBy === "Rating (High to Low)") return b.rating - a.rating;
    return 0;
  });
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
  const total = filtersCategories.length;

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
              data={[
                "Price (Low to High)",
                "Price (High to Low)",
                "Rating (High to Low)",
                "Name (A-Z)",
              ]}
              value={sortBy}
              onChange={(value) => setSortBy(value || "")}
            />
          </Group>

          <Grid>
            {sortedFiltersCategories.map((product) => (
              <Grid.Col span={4} key={product.id}>
                <ProductCard product={product} />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Products;
