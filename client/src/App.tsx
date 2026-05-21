import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@mantine/core/styles.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
      {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  );
}

export default App;
