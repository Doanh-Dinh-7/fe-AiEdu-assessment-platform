import { useState } from "react";
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/jwt";

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
    <>
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
    </>
  );
};

export default LoginPage;
