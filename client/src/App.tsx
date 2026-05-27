import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@mantine/core/styles.css";
import { Loader, Center } from "@mantine/core";
import { Suspense } from "react";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Suspense
          fallback={
            <Center h="100vh">
              <Loader />
            </Center>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
