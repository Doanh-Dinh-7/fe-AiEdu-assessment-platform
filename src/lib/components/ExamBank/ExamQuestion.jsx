import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionLevelBox from "./QuestionLevelBox";
// import EditQuestionModal from "./EditQuestionModal"; // Import modal mới

const questionData = [
  {
    stt: 1,
    content:
      "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
    level: "Dễ",
    createdAt: "12/04/2025",
  },
  {
    stt: 2,
    content:
      "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
    level: "Trung bình",
    createdAt: "12/04/2025",
  },
  {
    stt: 3,
    content:
      "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
    level: "Khó",
    createdAt: "12/04/2025",
  },
];

const countLevel = (level) =>
  questionData.filter((q) => q.level === level).length;

const ExamQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateQuestion = (q, mode, defaultData = {}) => {
    navigate(`${location.pathname}/${q.stt}`, { state: { mode, defaultData } });
  };

  return (
    <Box minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={5}>
      <Flex w="100%" maxW="1200px" direction="column" gap={4}>
        <Center flex={1}>
          <Heading fontSize="lg" mb={2} textTransform="uppercase">
            Câu hỏi chương {1}
          </Heading>
        </Center>
        {/* Box cố định hiển thị số câu hỏi theo cấp độ */}
        <QuestionLevelBox
          easy={countLevel("Dễ")}
          medium={countLevel("Trung bình")}
          hard={countLevel("Khó")}
        />
        <Flex justify="flex-end" mb={4}>
          <Button
            colorScheme="blue"
            onClick={() => navigate(`${location.pathname}/create-question`)}
          >
            Tạo câu hỏi
          </Button>
        </Flex>
      </Flex>
      <Table variant="simple" bg="white">
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Câu hỏi</Th>
            <Th>Mức độ</Th>
            <Th>Ngày tạo</Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {questionData.map((q) => (
            <Tr key={q.stt}>
              <Td>{q.stt}</Td>
              <Td>{q.content}</Td>
              <Td>{q.level}</Td>
              <Td>{q.createdAt}</Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => handleNavigateQuestion(q, "view")}
                ></Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEdit />}
                  size="sm"
                  colorScheme="yellow"
                  variant="ghost"
                  onClick={() => handleNavigateQuestion(q, "edit")}
                ></Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaTrash />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  ml={2}
                ></Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExamQuestion;
