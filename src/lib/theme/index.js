// src/theme/index.js
import { extendTheme } from "@chakra-ui/react";

// Define custom color palettes
const colors = {
  brand: {
    50: "#e3f2ff",
    100: "#bbdcff",
    200: "#90c4ff",
    300: "#64abff",
    400: "#3b94ff",
    500: "#4A90E2", // main primary
    600: "#357ABD",
    700: "#2a5f96",
    800: "#1e4570",
    900: "#122d4a",
  },
  gray: {
    50: "#F8F9FB",
    100: "#F2F4F8",
    200: "#E0E0E0",
    300: "#C4C4C4",
    400: "#A0A0A0",
    500: "#5F6368",
    600: "#3C4043",
    700: "#1C1C1C",
    800: "#121212",
    900: "#0a0a0a",
  },
  text: {
    primary: "#1C1C1C",
    secondary: "#5F6368",
  },
  background: "#F2F4F8",
  surface: "#FFFFFF",
  border: "#E0E0E0",
  success: {
    100: "#DFF5E9",
    200: "#B6EFCF",
    300: "#7CDEAA",
    400: "#4FCF88",
    500: "#34A853",
    600: "#258944",
  },

  error: {
    100: "#FDE8E6",
    200: "#FAC6C3",
    300: "#F59A95",
    400: "#F06F68",
    500: "#EA4335",
    600: "#B31412",
  },

  warning: {
    100: "#FEF3EC",
    200: "#FCD7C8",
    300: "#FAB28E",
    400: "#F99C72",
    500: "#F28B82",
    600: "#EA4335",
  },
  accent: {
    // New accent color palette
    50: "#F5EBFF",
    100: "#E9D5FF",
    200: "#D8B4FE",
    300: "#C084FC",
    400: "#A78BFA",
    500: "#9333EA", // Main accent
    600: "#7E22CE",
    700: "#6B21A8",
    800: "#581C87",
    900: "#4A0E78",
  },
};

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },
  colors,

  textStyles: {
    heading: {
      fontSize: ["24px", "32px"],
      fontWeight: "bold",
      lineHeight: "1.2",
    },
    label: {
      fontSize: "14px",
      fontWeight: "medium",
      color: "text.secondary",
    },
  },

  layerStyles: {
    card: {
      bg: "surface",
      borderRadius: "xl",
      boxShadow: "sm",
      p: 4,
    },
    glass: {
      backdropFilter: "blur(10px)",
      bg: "rgba(255,255,255,0.6)",
      borderRadius: "xl",
      border: "1px solid",
      borderColor: "border",
    },
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
        fontWeight: "medium",
        boxShadow: "sm",
      },
      variants: {
        solid: (props) => {
          const { colorScheme } = props;
          const textColor = colorScheme === "warning" ? "gray.800" : "white";

          return {
            bg: `${colorScheme}.500`,
            color: textColor,
            _hover: {
              bg: `${colorScheme}.600`,
            },
          };
        },
        gradient: {
          // New gradient variant
          bg: "linear-gradient(to right, brand.400, brand.600)", // Change to blue gradient
          color: "white",
          _hover: {
            // Consider a slightly different gradient or scale effect on hover
            opacity: 0.9,
          },
        },
      },
    },

    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: "md",
            borderColor: "border",
            _focus: {
              borderColor: "brand.500",
              boxShadow: "0 0 0 1px #4A90E2",
            },
          },
        },
      },
    },

    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: "md",
          boxShadow: "lg",
        },
        header: {
          fontWeight: "bold",
          fontSize: "lg",
        },
        closeButton: {
          top: 4,
          right: 4,
        },
      },
    },

    Table: {
      variants: {
        simple: {
          th: {
            borderBottom: "1px solid",
            borderColor: "border",
            bg: "background",
            color: "text.secondary",
            fontWeight: "semibold",
            fontSize: "sm",
          },
          td: {
            borderBottom: "1px solid",
            borderColor: "border",
            fontSize: "sm",
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
          _checked: { bg: "brand.500" },
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
        bg: "#F2F4F8", // Keep background as is for now, gradient might be a wrapper
        color: "text.primary",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
      },
    },
  },
});

export default theme;
