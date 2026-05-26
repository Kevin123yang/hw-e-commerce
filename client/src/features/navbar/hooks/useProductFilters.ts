import { useSearchParams } from "react-router-dom";

export default function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All Categories";

  const sort = searchParams.get("sort");
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 2000);
  const rating = Number(searchParams.get("rating") || 0);
  const onSale = searchParams.get("onSale") === "true";

  const applyFilter = (
    category: string,
    priceRange: [number, number],
    rating: number,
    onSale: boolean
  ) => {
    const nextParams = new URLSearchParams();
    if (category !== "All Categories") {
      nextParams.set("category", category);
    }
    nextParams.set("minPrice", String(priceRange[0]));
    nextParams.set("maxPrice", String(priceRange[1]));
    if (rating !== 0) {
      nextParams.set("rating", String(rating));
    }
    if (onSale) {
      nextParams.set("onSale", "true");
    }
    setSearchParams(nextParams);
  };

  const resetCategory = () => {
    setSearchParams({});
  };
  return {
    category,
    sort,
    minPrice,
    maxPrice,
    rating,
    onSale,
    resetCategory,
    applyFilter,
  };
}
