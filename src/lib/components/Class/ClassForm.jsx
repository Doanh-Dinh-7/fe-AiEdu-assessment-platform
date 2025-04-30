import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ClassForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const { mode = "create", defaultData = {} } = location.state || {};

  const [className, setClassName] = useState(defaultData.name || "");
  const [classCode, setClassCode] = useState(defaultData.code || "");
  const [description, setDescription] = useState(defaultData.description || "");

  const handleSave = () => {
    if (!className || !classCode) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // TODO: Gọi API tạo/cập nhật lớp học phần

    toast({
      title:
        mode === "edit" ? "Đã cập nhật lớp học phần." : "Đã tạo lớp học phần.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/class");
  };

  return (
    <Flex minH="100vh" direction="column" bg="#F5F9FF" align="center" pt={5}>
      <Box
        w="100%"
        maxW="700px"
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
      >
        <Heading
          fontSize="lg"
          textAlign="center"
          textTransform="uppercase"
          mb={6}
        >
          {mode === "edit" ? "Cập nhật" : "Tạo"} lớp học phần
        </Heading>

        <Flex direction="column" gap={4}>
          <Flex direction="column">
            <Text fontWeight="bold" mb={1}>
              Tên lớp học phần
            </Text>
            <Input
              placeholder="VD: Quản trị học 48K21.2"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              bg="gray.50"
            />
          </Flex>

          <Flex direction="column">
            <Text fontWeight="bold" mb={1}>
              Mã lớp học phần
            </Text>
            <Input
              placeholder="VD: QTH-01"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              bg="gray.50"
            />
          </Flex>

          <Flex direction="column">
            <Text fontWeight="bold" mb={1}>
              Mô tả (tuỳ chọn)
            </Text>
            <Textarea
              placeholder="Mô tả nội dung hoặc lưu ý về lớp học phần này..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg="gray.50"
            />
          </Flex>
        </Flex>

        <Flex justify="flex-end" mt={6}>
          <Button colorScheme="blue" onClick={handleSave}>
            {mode === "edit" ? "Cập nhật" : "Lưu"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ClassForm;
