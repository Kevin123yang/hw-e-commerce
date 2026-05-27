import {
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  RangeSlider,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useProducts } from "../hooks/useProducts";
import useProductFilters from "../../navbar/hooks/useProductFilters";
import { useState } from "react";

const RATINGS = [4, 3, 2, 1];
export const ProductSidebarFilters = () => {
  const { data } = useProducts();
  const {
    category,
    resetCategory,
    minPrice,
    maxPrice,
    rating,
    onSale,
    applyFilter,
  } = useProductFilters();

  const categoriesData =
    data?.products.map((product) => product.category) || [];
  const categories = ["All Categories", ...new Set(categoriesData)];
  const [draftCategory, setDraftCategory] = useState(category);
  const [draftPriceRange, setDraftPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [draftRating, setDraftRating] = useState(rating);
  const [draftOSale, setDraftOnSale] = useState(onSale);
  const [isFilter, setIsFilter] = useState(false);
  const handleReset = () => {
    setDraftCategory("All Categories");
    setDraftPriceRange([0, 2000]);
    setDraftRating(0);
    setDraftOnSale(false);
    resetCategory();
    setIsFilter(false);
  };
  const hasChanges =
    draftCategory !== category ||
    draftPriceRange[0] !== minPrice ||
    draftPriceRange[1] !== maxPrice ||
    draftRating !== rating ||
    draftOSale != onSale;

  const handleChange = () => {
    applyFilter(draftCategory, draftPriceRange, draftRating, draftOSale);
    setIsFilter(false);
  };

  return (
    <Stack gap="md">
      <Box p="sm" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <Stack gap="md">
          <Group justify="space-between" align="center" mb="xl">
            <Title order={2}>Filters</Title>
            {isFilter && hasChanges && (
              <Group>
                <Button onClick={handleChange}>Apply</Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </Group>
            )}
          </Group>

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Category
            </Text>
            <Select
              data={categories}
              searchable
              clearable={draftCategory !== "All Categories"}
              value={draftCategory}
              onChange={(value) => {
                setIsFilter(true);

                setDraftCategory(value || "All Categories");
              }}
            />
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Price Range
            </Text>
            <RangeSlider
              min={0}
              max={2000}
              step={50}
              value={draftPriceRange}
              onChange={(value) => {
                setIsFilter(true);
                setDraftPriceRange(value);
              }}
              marks={[
                { value: 0, label: "$0" },
                { value: 2000, label: "$2000" },
              ]}
              mb="md"
            />
            <Group grow>
              <NumberInput
                label="Min"
                value={0}
                min={0}
                max={2000}
                prefix="$"
              />
              <NumberInput
                label="Max"
                value={2000}
                min={0}
                max={2000}
                prefix="$"
              />
            </Group>
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Rating
            </Text>
            <Stack gap="xs">
              {RATINGS.map((starRating) => (
                <Group key={starRating} gap="xs">
                  <Checkbox
                    checked={draftRating === starRating}
                    onClick={() => {
                      setIsFilter(true);
                      setDraftRating(starRating);
                    }}
                  />
                  <Group gap={2}>
                    {[...Array(starRating)].map((_, i) => (
                      <IconStarFilled key={i} size={16} color="#ffd43b" />
                    ))}
                    {[...Array(5 - starRating)].map((_, i) => (
                      <IconStar key={i} size={16} color="#868e96" />
                    ))}
                  </Group>
                  <Text size="sm">& up</Text>
                </Group>
              ))}
            </Stack>
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Deals
            </Text>
            <Switch
              label="On Sale / Discounted"
              checked={draftOSale}
              onClick={() => {
                setIsFilter(true);
                setDraftOnSale((prev) => !prev);
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
