import { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom"; // Removed as it's not used here
import { register, testAddStudent } from "../../service/jwt";

const RegisterPage = ({ setShowRegister }) => {
  const [formData, setFormData] = useState({
    TenDangNhap: "",
    MatKhau: "",
    XacNhanMatKhau: "",
    VaiTro: "student",
    MaSo: "",
    TenGiangVien: "",
    TruongDaiHoc: "",
    LopSinhHoat: "",
    TenSinhVien: "",
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const maLopHocPhan = "LHP044272";

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(formData);

      const body = {
        MaSinhVien: formData.MaSo,
      };
      await testAddStudent(body, maLopHocPhan);
      toast({
        title: "Đăng ký thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setShowRegister(false);
    } catch (error) {
      setError(error.message);
      toast({
        title: "Đăng ký thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log("Lỗi khi thêm sinh viên: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Tên đăng nhập
          </FormLabel>
          <Input
            type="text"
            name="TenDangNhap"
            value={formData.TenDangNhap}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Mật khẩu
          </FormLabel>
          <Input
            type="password"
            name="MatKhau"
            value={formData.MatKhau}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Xác nhận mật khẩu
          </FormLabel>
          <Input
            type="password"
            name="XacNhanMatKhau"
            value={formData.XacNhanMatKhau}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Vai trò
          </FormLabel>
          <Input
            type="text"
            name="VaiTro"
            value={formData.VaiTro}
            readOnly
            cursor="not-allowed"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            MSSV
          </FormLabel>
          <Input
            type="text"
            name="MaSo"
            value={formData.MaSo}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Tên sinh viên
          </FormLabel>
          <Input
            type="text"
            name="TenSinhVien"
            value={formData.TenSinhVien}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Lớp sinh hoạt
          </FormLabel>
          <Input
            type="text"
            name="LopSinhHoat"
            value={formData.LopSinhHoat}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="textSecondary" fontWeight="medium">
            Trường đại học
          </FormLabel>
          <Input
            type="text"
            name="TruongDaiHoc"
            value={formData.TruongDaiHoc}
            onChange={handleChange}
          />
        </FormControl>
      </SimpleGrid>

      {error && <Text color="red.500">{error}</Text>}

      <Button
        colorScheme="brand"
        width="full"
        borderRadius="md"
        fontWeight="medium"
        fontSize="md"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        mt={4}
        onClick={handleRegister}
        isLoading={loading}
      >
        Đăng ký
      </Button>
    </>
  );
};

export default RegisterPage;
