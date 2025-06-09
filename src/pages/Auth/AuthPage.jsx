import { useState } from "react";
import LoginPage from "../../lib/components/Auth/Login";
import RegisterPage from "../../lib/components/Auth/Register";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import bgLogin from "../../asset/images/bg-Login.jpeg";

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="background"
      fontFamily="Inter, sans-serif"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="rgba(28,28,28,0.30)"
        zIndex={1}
      />
      <VStack
        zIndex={2}
        spacing={6}
        p={{ base: 4, md: 10 }}
        bg="surface"
        borderRadius="md"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        w="80vw"
        minW={{ base: "90vw", md: "400px" }}
        maxW={showRegister ? "600px" : "400px"}
        align="stretch"
      >
        <Heading
          size="lg"
          textTransform="uppercase"
          color="brand.500"
          fontWeight="bold"
          textAlign="center"
          letterSpacing={1}
        >
          {showRegister ? "Đăng ký" : "Đăng nhập"}
        </Heading>
        {showRegister ? (
          <>
            <RegisterPage setShowRegister={setShowRegister} />
            <Text>
              Bạn đã có tài khoản?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setShowRegister(false)}
              >
                Đăng nhập
              </Button>
            </Text>
          </>
        ) : (
          <>
            <LoginPage />
            <Text>
              Bạn chưa có tài khoản?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setShowRegister(true)}
              >
                Đăng ký
              </Button>
            </Text>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default AuthPage;
