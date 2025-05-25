import { useEffect } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";

const HomePage = () => {
  useEffect(() => {
    const VaiTro = localStorage.getItem("VaiTro");

    if (!VaiTro) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="background"
      fontFamily="Inter, sans-serif"
    >
      <Box textAlign="center">
        <Heading as="h1" size="xl" color="textPrimary">
          Chào mừng đến trang chủ
        </Heading>
      </Box>
    </Flex>
  );
};

export default HomePage;
