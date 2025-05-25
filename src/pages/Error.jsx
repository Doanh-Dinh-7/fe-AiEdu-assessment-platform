import { Box, Heading, Text, Flex } from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="background"
      fontFamily="Inter, sans-serif"
    >
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={4} color="textPrimary">
          Có lỗi xảy ra
        </Heading>
        <Text fontSize="lg" color="textSecondary">
          Rất tiếc, đã có vấn đề xảy ra khi tải trang.
        </Text>
      </Box>
    </Flex>
  );
}
