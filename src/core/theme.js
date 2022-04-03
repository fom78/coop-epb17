import {extendTheme, theme} from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  primary: {
   main: "red",
   50: "#ED8936",
   100: "#bbdefb",
   200: "#90caf9",
   300: "#64b5f6",
   400: "#42a5f5",
   500: "#2196f3",
   600: "#1e88e5",
   700: "#1976d2",
   800: "#1565c0",
   900: "#0d47a1"
 }
}

export default extendTheme({
  colors: {
    primary: "#171717",
    secondary: theme.colors.blackAlpha,
    tertiary: "#dedede",
    bgColor: "#f5f5f5",
  },
  config,
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          color: "primary",
        },
        _focus: {
          color: "primary",
          boxShadow: "0 0 0 2px #171717",
        },
      },
      variants: {
        solid: () => ({
          roundedLeft: 0,
          colorScheme: "secondary",
        }),
      },
    },
  },
  styles: {
    global: () => ({
      "::selection": {
        bg: "secondary.200",
        color: "primary",
      },
    }),
  },
});
