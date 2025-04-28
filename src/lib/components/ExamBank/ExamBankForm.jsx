import {
  Flex,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExamBankForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode = "create", defaultData = {} } = location.state || {};

  const [chapters, setChapters] = useState(defaultData.chapters || []);

  const handleAddChapter = () => {
    const newIndex = chapters.length + 1;
    setChapters([
      ...chapters,
      {
        name: `Chương ${newIndex}`,
        createdAt: new Date().toLocaleDateString("vi-VN"),
      },
    ]);
  };

  const handleSave = () => {
    // call API và chuyển hướng về trang danh sách ngân hàng đề thi
    navigate("/exam-bank");
  };

  return (
    <Flex minH="100vh" direction="column" bg="#F5F9FF" align="center" pt={8}>
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
              value={defaultData.name || ""}
              size="sm"
              w="180px"
              bg="white"
            />
            <Text fontWeight="bold">Mã học phần:</Text>
            <Input
              value={defaultData.code || ""}
              size="sm"
              w="60px"
              bg="white"
            />
          </Flex>
          <Flex wrap="wrap" gap={4} align="center">
            <Text fontWeight="bold">Tổng số câu hỏi:</Text>
            <Input
              value={defaultData.totalQuestions || 100}
              size="sm"
              w="80px"
              bg="white"
            />
            <Text fontWeight="bold">Số tín chỉ:</Text>
            <Input
              value={defaultData.creditHours || 3}
              size="sm"
              w="80px"
              bg="white"
            />
          </Flex>
          <Flex wrap="wrap" gap={4} align="center">
            <Text fontWeight="bold">Hình thức thi:</Text>
            <Input
              value={defaultData.examType || "Vấn đáp"}
              size="sm"
              w="180px"
              bg="white"
            />
            <Text fontWeight="bold">Bậc đào tạo:</Text>
            <Input
              value={defaultData.educationLevel || "Chính quy"}
              size="sm"
              w="180px"
              bg="white"
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Mô tả:</Text>
          <Textarea
            bg="white"
            p={3}
            borderRadius="md"
            fontSize="sm"
            whiteSpace="pre-line"
            value={defaultData.description || ""}
          />
        </Flex>
      </Flex>
      <Flex
        w="100%"
        justify="space-between"
        align="center"
        mb={6}
        maxW="1200px"
      >
        <Center flex={1}>
          <Table variant="simple" size="md" mt={4}>
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Chương</Th>
                <Th>Ngày tạo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {chapters.map((chapter, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{chapter.name}</Td>
                  <Td>{chapter.createdAt}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Center>
        <Button
          align="right"
          ml={4}
          px={8}
          colorScheme="blue"
          onClick={handleAddChapter}
        >
          Thêm chương
        </Button>
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
