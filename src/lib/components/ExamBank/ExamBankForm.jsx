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
  Box,
  Select,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCourse, updateCourse } from "../../service/course";
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
    HinhThucThi: defaultData.HinhThucThi || "vấn đáp",
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="background"
      pt={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontSize="xl"
            mb={2}
            textTransform="uppercase"
            color="brand.500"
            letterSpacing={1}
          >
            {mode === "edit" ? "Cập nhật" : "Tạo"} ngân hàng đề thi{" "}
            {defaultData.TenHocPhan}
          </Heading>
        </Center>
      </Flex>
      <Box
        w="100%"
        maxW="1200px"
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <Flex direction="column" gap={4}>
          <Flex wrap="wrap" gap={6} align="center">
            <Text fontWeight="semibold" fontSize="sm" color="textSecondary">
              Học phần:
            </Text>
            <Input
              name="TenHocPhan"
              value={formData.TenHocPhan}
              onChange={handleChange}
              size="sm"
              w="180px"
              borderRadius="md"
              bg="background"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            />
            <Text fontWeight="semibold" fontSize="sm" color="textSecondary">
              Số tín chỉ:
            </Text>
            <Input
              name="SoTinChi"
              value={formData.SoTinChi}
              onChange={handleChange}
              size="sm"
              w="80px"
              borderRadius="md"
              bg="background"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            />
          </Flex>
          <Flex wrap="wrap" gap={6} align="center">
            <Text fontWeight="semibold" fontSize="sm" color="textSecondary">
              Tổng số câu hỏi:
            </Text>
            <Input
              name="TongSoCau"
              value={formData.TongSoCau}
              onChange={handleChange}
              size="sm"
              w="80px"
              borderRadius="md"
              bg="background"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            />
            <Flex>
              <FormControl isInvalid={!!chapterError}>
                <Flex gap={6} align="center">
                  <Text
                    fontWeight="semibold"
                    fontSize="sm"
                    color="textSecondary"
                  >
                    Số chương:
                  </Text>
                  <Input
                    name="SoChuong"
                    value={formData.SoChuong}
                    onChange={handleChange}
                    size="sm"
                    w="80px"
                    borderRadius="md"
                    bg="background"
                    fontSize="sm"
                    boxShadow="sm"
                    borderColor="border"
                    color="textPrimary"
                    _placeholder={{ color: "textSecondary" }}
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "outline",
                    }}
                    isInvalid={!!chapterError}
                  />
                  <FormErrorMessage>{chapterError}</FormErrorMessage>
                </Flex>
              </FormControl>
            </Flex>
          </Flex>
          <Flex wrap="wrap" gap={6} align="center">
            <Text fontWeight="semibold" fontSize="sm" color="textSecondary">
              Hình thức thi:
            </Text>
            <Select
              name="HinhThucThi"
              value={formData.HinhThucThi}
              onChange={handleChange}
              size="sm"
              w="180px"
              borderRadius="md"
              bg="background"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="textPrimary"
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            >
              <option value="vấn đáp">Vấn đáp</option>
              <option value="tự luận">Tự luận</option>
            </Select>
            <Text fontWeight="semibold" fontSize="sm" color="textSecondary">
              Bậc đào tạo:
            </Text>
            <Input
              name="BacDaoTao"
              value={formData.BacDaoTao}
              onChange={handleChange}
              size="sm"
              w="180px"
              borderRadius="md"
              bg="background"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap={2} mt={4}>
          <Text fontWeight="semibold" fontSize="sm" color="textSecondary">
            Mô tả:
          </Text>
          <Textarea
            ref={textareaRef}
            name="MoTaHocPhan"
            bg="background"
            p={3}
            borderRadius="md"
            fontSize="sm"
            boxShadow="sm"
            borderColor="border"
            color="textPrimary"
            _placeholder={{ color: "textSecondary" }}
            _focus={{
              borderColor: "brand.500",
              boxShadow: "outline",
            }}
            value={formData.MoTaHocPhan}
            onChange={handleChange}
          />
        </Flex>

        <Flex justify="flex-end" mt={6}>
          <Button
            colorScheme="brand"
            borderRadius="md"
            px={8}
            fontWeight="semibold"
            fontSize="md"
            boxShadow="md"
            onClick={handleSave}
            isLoading={loading}
            isDisabled={!!chapterError}
          >
            {mode === "edit" ? "Cập nhật" : "Lưu"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ExamBankForm;
