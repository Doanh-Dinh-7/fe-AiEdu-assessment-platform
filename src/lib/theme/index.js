// src/theme/index.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#0B2545", // Xanh đậm
      800: "#13315C",
      700: "#1D2D44",
      600: "#274690",
      500: "#3E64FF", // Xanh chủ đạo
      400: "#5D8BF4",
      300: "#8BBFFF", // Xanh nhạt
      200: "#B3C7F7", // Xanh rất nhạt
      100: "#E3ECFF", // Nền xanh siêu nhạt
      50: "#F5F9FF", // Nền phụ
    },
    blue: {
      900: "#0B2545",
      800: "#13315C",
      700: "#1D2D44",
      600: "#274690",
      500: "#3E64FF",
      400: "#5D8BF4",
      300: "#8BBFFF",
      200: "#B3C7F7",
      100: "#E3ECFF",
      50: "#F5F9FF",
    },
    yellow: {
      500: "#FFD600",
    },
    red: {
      500: "#FF5A5F",
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "blue.500",
          color: "white",
          _hover: {
            bg: "blue.600",
          },
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderBottom: "1px solid",
            borderColor: "blue.200",
            textTransform: "none",
            letterSpacing: "normal",
            fontWeight: "medium",
            bg: "blue.50",
            color: "blue.800",
          },
          td: {
            borderBottom: "1px solid",
            borderColor: "blue.100",
            color: "blue.900",
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "blue.50",
        color: "blue.900",
      },
    },
  },
});

export default theme;
