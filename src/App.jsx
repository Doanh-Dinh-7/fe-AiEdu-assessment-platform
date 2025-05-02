import { Stack } from "@chakra-ui/react";
import { router } from "./lib/router/browserRouter";
import { RouterProvider } from "react-router-dom";


function App() {
  return (
    <Stack maxHeight="100vh">
      <RouterProvider router={router} />
    </Stack>
  );
}

export default App;
