import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/controller/jwt";

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
    >
      <VStack spacing={4} p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading size="lg" textTransform="uppercase">
          Đăng Nhập
        </Heading>
        <FormControl>
          <FormLabel>Tài khoản</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Mật khẩu</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleLogin}>
          Đăng Nhập
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
