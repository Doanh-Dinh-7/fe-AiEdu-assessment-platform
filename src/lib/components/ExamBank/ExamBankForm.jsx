import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Textarea,
  Center,
  useToast,
  FormErrorMessage,
  FormControl,
  Spinner,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCourse, updateCourse } from "../../controller/course";
import { useState } from "react";
import useAutoResizeTextarea from "../../hooks/useAutoResizeTextarea";

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

  const { textareaRef } = useAutoResizeTextarea(formData.MoTaHocPhan);
  const initialChapterCount = defaultData.SoChuong || 3;
  const [chapterError, setChapterError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "SoChuong") {
      const numericValue = parseInt(value);
      if (numericValue < initialChapterCount) {
        setChapterError(
          `Không được giảm số chương dưới ${initialChapterCount}`
        );
      } else {
        setChapterError("");
      }
    }

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
        const data = await updateCourse(formData, defaultData.MaHocPhan);
        if (!data) {
          throw new Error("Failed to fetch course detail");
        }
        toast({
          title: "Cập nhật ngân hàng đề thi thành công",
          description: "Ngân hàng đề thi đã được cập nhật thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Call the API to create a new course
        const data = await createCourse(formData);
        if (!data) {
          throw new Error("Failed to fetch course detail");
        }
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

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="#4A90E2" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="#F2F4F8"
      pt={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontSize="20px"
            mb={2}
            textTransform="uppercase"
            color="#4A90E2"
            letterSpacing={1}
          >
            {mode === "edit" ? "Cập nhật" : "Tạo"} ngân hàng đề thi{" "}
            {defaultData.TenHocPhan}
          </Heading>
        </Center>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={4}
        mb={2}
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <Flex direction="column" gap={4}>
          <Flex wrap="wrap" gap={4} align="center">
            <Text fontWeight="bold">Học phần:</Text>
            <Input
              name="TenHocPhan"
              value={formData.TenHocPhan}
              onChange={handleChange}
              size="sm"
              w="180px"
              borderRadius="12px"
              bg="#F2F4F8"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold">Số tín chỉ:</Text>
            <Input
              name="SoTinChi"
              value={formData.SoTinChi}
              onChange={handleChange}
              size="sm"
              w="80px"
              borderRadius="12px"
              bg="#F2F4F8"
              fontWeight="medium"
              color="#1C1C1C"
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
              borderRadius="12px"
              bg="#F2F4F8"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Flex>
              <FormControl isInvalid={!!chapterError}>
                <Flex gap={4} align="center">
                  <Text fontWeight="bold">Số chương:</Text>
                  <Input
                    name="SoChuong"
                    value={formData.SoChuong}
                    onChange={handleChange}
                    size="sm"
                    w="80px"
                    borderRadius="12px"
                    bg="#F2F4F8"
                    fontWeight="medium"
                    color="#1C1C1C"
                    isInvalid={!!chapterError}
                  />
                  <FormErrorMessage>{chapterError}</FormErrorMessage>
                </Flex>
              </FormControl>
            </Flex>
          </Flex>
          <Flex wrap="wrap" gap={4} align="center">
            <Text fontWeight="bold">Hình thức thi:</Text>
            <Input
              name="HinhThucThi"
              value={formData.HinhThucThi}
              onChange={handleChange}
              size="sm"
              w="180px"
              borderRadius="12px"
              bg="#F2F4F8"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold">Bậc đào tạo:</Text>
            <Input
              name="BacDaoTao"
              value={formData.BacDaoTao}
              onChange={handleChange}
              size="sm"
              w="180px"
              borderRadius="12px"
              bg="#F2F4F8"
              fontWeight="medium"
              color="#1C1C1C"
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Mô tả:</Text>
          <Textarea
            ref={textareaRef}
            name="MoTaHocPhan"
            bg="#F2F4F8"
            p={3}
            borderRadius="12px"
            fontSize="sm"
            whiteSpace="pre-line"
            value={formData.MoTaHocPhan}
            color="#1C1C1C"
            fontWeight="medium"
            onChange={handleChange}
          />
        </Flex>
      </Flex>
      <Flex w="100%" maxW="1200px" justify="flex-end" align="center" mb={6}>
        <Button
          mt={4}
          ml={4}
          bg="#34A853"
          color="#fff"
          borderRadius="999px"
          px={8}
          fontWeight="bold"
          fontSize="16px"
          boxShadow="0 2px 8px rgba(52,168,83,0.08)"
          _hover={{ bg: "#1e7e34" }}
          onClick={handleSave}
        >
          {mode === "edit" ? "Cập nhật" : "Lưu"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ExamBankForm;
