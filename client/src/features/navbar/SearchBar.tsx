import { ActionIcon, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <form onSubmit={(e) => e.preventDefault()} role="search">
      <TextInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        leftSection={<IconSearch size={16} aria-hidden="true" />}
        rightSection={
          <ActionIcon
            type="submit"
            aria-label="Search"
            variant="filled"
            color="blue"
            onClick={() => {
              const nextParams = new URLSearchParams(location.search);
              if (search.trim()) {
                nextParams.set("search", search.trim());
              } else {
                nextParams.delete("search");
              }

              navigate(`/products?${nextParams.toString()}`);
            }}
          >
            <IconSearch size={16} />
          </ActionIcon>
        }
        style={{ width: 400 }}
        aria-label="Search products"
      />
    </form>
  );
};
