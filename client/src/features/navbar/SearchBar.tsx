import { ActionIcon, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate()
  
  return (
    <form role="search">
      <TextInput
        placeholder="Search products..."
        leftSection={<IconSearch size={16} aria-hidden="true" />}
        rightSection={
          <ActionIcon
            type="submit"
            aria-label="Search"
            variant="filled"
            color="blue"
            onClick={() => navigate("/products")}
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
