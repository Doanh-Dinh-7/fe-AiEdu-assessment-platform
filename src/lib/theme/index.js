// src/theme/index.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  colors: {
    primary: "#4A90E2",
    background: "#F2F4F8",
    surface: "#FFFFFF",
    textPrimary: "#1C1C1C",
    textSecondary: "#5F6368",
    success: "#34A853",
    error: "#EA4335",
    warning: "#FBBC05",
    border: "#E0E0E0",
    gray: {
      50: "#F8F9FB",
      100: "#F2F4F8",
      200: "#E0E0E0",
      300: "#C4C4C4",
      400: "#A0A0A0",
      500: "#5F6368",
      600: "#3C4043",
      700: "#1C1C1C",
    },
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "12px",
        fontWeight: "medium",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      },
      variants: {
        solid: (props) => {
          const { colorScheme } = props;
          if (colorScheme === "primary" || colorScheme === "blue") {
            return {
              bg: "primary",
              color: "white",
              _hover: { bg: "#357ABD" },
            };
          }
          if (colorScheme === "success") {
            return {
              bg: "success",
              color: "white",
              _hover: { bg: "#258944" },
            };
          }
          if (colorScheme === "error" || colorScheme === "red") {
            return {
              bg: "error",
              color: "white",
              _hover: { bg: "#B31412" },
            };
          }
          if (colorScheme === "warning" || colorScheme === "yellow") {
            return {
              bg: "warning",
              color: "#222",
              _hover: { bg: "#E2B203" },
            };
          }
          return {};
        },
      },
    },
    Input: {
      baseStyle: {
        borderRadius: "12px",
        fontSize: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      },
      variants: {
        outline: {
          field: {
            borderRadius: "12px",
            borderColor: "border",
            _focus: {
              borderColor: "primary",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            },
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        },
        header: {
          fontWeight: "bold",
          fontSize: "18px",
        },
        closeButton: {
          top: "16px",
          right: "16px",
        },
      },
    },
    Table: {
      baseStyle: {
        th: {
          bg: "background",
          color: "textSecondary",
          fontWeight: "bold",
          fontSize: "15px",
        },
        td: {
          fontSize: "14px",
        },
      },
      variants: {
        simple: {
          th: {
            borderBottom: "1px solid",
            borderColor: "border",
            bg: "background",
            color: "textSecondary",
          },
          td: {
            borderBottom: "1px solid",
            borderColor: "border",
          },
          tr: {
            _hover: {
              bg: "gray.50",
            },
          },
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: "border",
          _checked: { bg: "primary" },
        },
        thumb: {
          bg: "white",
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "background",
        color: "textPrimary",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
  },
});

export default theme;
