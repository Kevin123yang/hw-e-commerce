import { useNavigate, useSearchParams } from "react-router-dom";

export default function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category") || "All Categories";
  const search = searchParams.get("search") || "";
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
    const nextParams = new URLSearchParams(searchParams);

    if (category !== "All Categories") {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }

    if (priceRange[0] !== 0) {
      nextParams.set("minPrice", String(priceRange[0]));
    } else {
      nextParams.delete("minPrice");
    }

    if (priceRange[1] !== 2000) {
      nextParams.set("maxPrice", String(priceRange[1]));
    } else {
      nextParams.delete("maxPrice");
    }

    if (rating !== 0) {
      nextParams.set("rating", String(rating));
    } else {
      nextParams.delete("rating");
    }

    if (onSale) {
      nextParams.set("onSale", "true");
    } else {
      nextParams.delete("onSale");
    }
    setSearchParams(nextParams);
  };
  const handleSearch = () => {
    const nextParams = new URLSearchParams(searchParams);

    if (search.trim()) {
      nextParams.set("search", search.trim());
    } else {
      nextParams.delete("search");
    }

    navigate(`/products?${nextParams.toString()}`);
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
    search,
    handleSearch,
  };
}
