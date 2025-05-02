import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./lib/theme/index.js";
import { ProgressProvider } from "./lib/components/Layout/ProgressContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </ChakraProvider>
  </React.StrictMode>
);
