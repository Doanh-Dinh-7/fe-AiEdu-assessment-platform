import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/service/jwt";
import bgLogin from "../asset/images/bg-Login.jpeg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await login(username, password);
    // localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("VaiTro", data.VaiTro);
    localStorage.setItem("MaTaiKhoan", data.MaTaiKhoan);
    navigate("/");
  };

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
        minW={{ base: "90vw", md: "400px" }}
        maxW="400px"
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
          Đăng nhập
        </Heading>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Tài khoản
          </FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            _placeholder={{ color: "textSecondary" }}
            _focus={{
              borderColor: "brand.500",
              boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Mật khẩu
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            _placeholder={{ color: "textSecondary" }}
            _focus={{
              borderColor: "brand.500",
              boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
            }}
          />
        </FormControl>
        <Button
          colorScheme="brand"
          width="full"
          borderRadius="md"
          fontWeight="medium"
          fontSize="md"
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          mt={4}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
        {/* <Text>
          Bạn chưa có tài khoản?{" "}
          <Button variant="link" colorScheme="blue">
            Đăng ký
          </Button>
        </Text> */}
      </VStack>
    </Box>
  );
};

export default LoginPage;
