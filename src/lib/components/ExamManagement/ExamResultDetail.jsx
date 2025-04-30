import {
  Box,
  Button,
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const questionDetails = [
  { stt: 1, question: "Nội dung câu hỏi 1", answer: "", score: "" },
  { stt: 2, question: "Nội dung câu hỏi phụ 1", answer: "", score: "" },
  { stt: 3, question: "Nội dung câu hỏi 2", answer: "", score: "" },
  { stt: 4, question: "Nội dung câu hỏi phụ 2", answer: "", score: "" },
  { stt: 5, question: "Nội dung câu hỏi 3", answer: "", score: "" },
  { stt: 6, question: "Nội dung câu hỏi phụ 3", answer: "", score: "" },
];

const ExamResultDetail = () => {
  const navigate = useNavigate();
  return (
    <Box minH="100vh" bg="#F5F9FF" p={0}>
      <Flex direction="column" align="center" pt={8}>
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
          >
            Chi tiết kết quả bài thi
          </Heading>
        </Center>
        <Box w="90%" maxW="900px" bg="white" borderRadius="md" p={4}>
          <Table size="md" variant="simple" border="1px solid #b3b3b3">
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Câu hỏi</Th>
                <Th>Câu trả lời</Th>
                <Th>Điểm</Th>
              </Tr>
            </Thead>
            <Tbody>
              {questionDetails.map((row) => (
                <Tr key={row.stt}>
                  <Td>{row.stt}</Td>
                  <Td>{row.question}</Td>
                  <Td>{row.answer}</Td>
                  <Td>{row.score}</Td>
                </Tr>
              ))}
              <Tr fontWeight="bold">
                <Td colSpan={3} textAlign="right">
                  Tổng
                </Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex w="90%" maxW="900px" justify="flex-end" mt={8}>
          <Button
            colorScheme="blackAlpha"
            borderRadius="md"
            px={10}
            fontWeight="bold"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ExamResultDetail;
