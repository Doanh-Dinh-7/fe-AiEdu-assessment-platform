import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Textarea,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCourse } from "../../controller/course";
import { useState } from "react";

const ExamBankForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, defaultData = {} } = location.state || {};
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState({
    TenHocPhan: defaultData.TenHocPhan || "",
    MoTaHocPhan: defaultData.MoTaHocPhan || "",
    SoTinChi: defaultData.SoTinChi || 3,
    SoChuong: defaultData.SoChuong || 3,
    TongSoCau: defaultData.TongSoCau || 100,
    HinhThucThi: defaultData.HinhThucThi || "Vấn đáp",
    BacDaoTao: defaultData.BacDaoTao || "Chính quy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (mode === "edit") {
        // Call the API to update the course
        // await updateCourse(formData);
        // toast({
        //   title: "Cập nhật ngân hàng đề thi thành công",
        //   description: "Ngân hàng đề thi đã được cập nhật thành công.",
        //   status: "success",
        //   duration: 3000,
        //   isClosable: true,
        // });
      } else {
        // Call the API to create a new course
        await createCourse(formData);
        toast({
          title: "Tạo ngân hàng đề thi thành công",
          description: "Ngân hàng đề thi đã được tạo thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/exam-bank");
    } catch (error) {
      console.error("Error saving course:", error);
      toast({
        title: "Lưu ngân hàng đề thi thất bại",
        description: "Có lỗi xảy ra khi lưu ngân hàng đề thi.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" direction="column" bg="#F5F9FF" align="center" pt={5}>
      <Flex w="100%" maxW="1200px" direction="column" gap={4}>
        <Center flex={1}>
          <Heading fontSize="lg" mb={2} textTransform="uppercase">
            {mode === "edit" ? "Cập nhật" : "Tạo"} ngân hàng đề thi Quản trị học
          </Heading>
        </Center>
        <Flex gridArea="2 / 2 / 1 / 1" direction="column" gap={4}>
          <Flex wrap="wrap" gap={4} align="center">
            <Text fontWeight="bold">Học phần:</Text>
            <Input
              name="TenHocPhan"
              value={formData.TenHocPhan}
              onChange={handleChange}
              size="sm"
              w="180px"
              bg="white"
            />
            <Text fontWeight="bold">Số tín chỉ:</Text>
            <Input
              name="SoTinChi"
              value={formData.SoTinChi}
              onChange={handleChange}
              size="sm"
              w="80px"
              bg="white"
            />
          </Flex>
          <Flex wrap="wrap" gap={4} align="center">
            <Text fontWeight="bold">Tổng số câu hỏi:</Text>
            <Input
              name="TongSoCau"
              value={formData.TongSoCau}
              onChange={handleChange}
              size="sm"
              w="80px"
              bg="white"
            />

            <Text fontWeight="bold">Số chương:</Text>
            <Input
              name="SoChuong"
              value={formData.SoChuong}
              onChange={handleChange}
              size="sm"
              w="80px"
              bg="white"
            />
          </Flex>
          <Flex wrap="wrap" gap={4} align="center">
            <Text fontWeight="bold">Hình thức thi:</Text>
            <Input
              name="HinhThucThi"
              value={formData.HinhThucThi}
              onChange={handleChange}
              size="sm"
              w="180px"
              bg="white"
            />
            <Text fontWeight="bold">Bậc đào tạo:</Text>
            <Input
              name="BacDaoTao"
              value={formData.BacDaoTao}
              onChange={handleChange}
              size="sm"
              w="180px"
              bg="white"
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Mô tả:</Text>
          <Textarea
            name="MoTaHocPhan"
            bg="white"
            p={3}
            borderRadius="md"
            fontSize="sm"
            whiteSpace="pre-line"
            value={formData.MoTaHocPhan}
            onChange={handleChange}
          />
        </Flex>
      </Flex>
      <Flex w="100%" justify="flex-end" align="center" mb={6}>
        <Button mt={4} ml={4} colorScheme="green" onClick={handleSave}>
          {mode === "edit" ? "Cập nhật" : "Lưu"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ExamBankForm;
