import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Textarea,
  Center,
  Text,
  Spinner,
} from "@chakra-ui/react";
import QuestionLevelBox from "./QuestionLevelBox";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import useAutoResizeTextarea from "../../hooks/useAutoResizeTextarea";

// const questionDetailData = [
//   {
//     stt: 1,
//     content: "Nội dung câu hỏi 1",
//     answer: "Nội dung đáp án 1",
//     level: "Dễ",
//     mainIdea: "Ý thứ nhất",
//     score: 1,
//     extraQuestion: "Câu hỏi cho ý 1",
//     extraAnswer: "Đáp án cho ý 1",
//   },
//   // ... thêm các dòng khác nếu cần
// ];

const QuestionDetail = () => {
  const location = useLocation();
  const { maCauHoi } = useParams();
  const { mode, questionDetailData, easy, medium, hard } = location.state || {};

  // Luôn gọi hook ở đầu
  const [question, setQuestion] = useState(questionDetailData?.NoiDung || "");
  const [answer, setAnswer] = useState(
    questionDetailData?.DapAn?.[0]?.NoiDung || ""
  );
  const keyPoints = questionDetailData?.DapAn?.[0]?.YChinh || [];
  const isEdit = mode === "edit";
  const questionRef = useAutoResizeTextarea(question);
  const answerRef = useAutoResizeTextarea(answer);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Center minH="200px">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
      </Center>
    );
  }

  // Nếu không có dữ liệu thì báo lỗi
  if (!questionDetailData) {
    return (
      <Box
        minH="100vh"
        bg="background"
        p={8}
        fontFamily="Inter, sans-serif"
        color="textPrimary"
      >
        <Text color="error.500">Không tìm thấy dữ liệu câu hỏi.</Text>
      </Box>
    );
  }

  return (
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
            Chi tiết câu hỏi {maCauHoi}
          </Heading>
        </Center>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={4}
        mb={2}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <QuestionLevelBox easy={easy} medium={medium} hard={hard} />
        <Box w="100%" mt={4}>
          <Text
            fontWeight="semibold"
            mb={1}
            color="textSecondary"
            fontSize="sm"
          >
            Câu hỏi:
          </Text>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            isReadOnly={!isEdit}
            resize="vertical"
            ref={questionRef}
            borderRadius="md"
            bg="background"
            color="textPrimary"
            fontWeight="medium"
            fontSize="sm"
            boxShadow="sm"
            borderColor="border"
            _placeholder={{ color: "textSecondary" }}
            _focus={{
              borderColor: "brand.500",
              boxShadow: "outline",
            }}
          />

          <Text
            fontWeight="semibold"
            mt={4}
            mb={1}
            color="textSecondary"
            fontSize="sm"
          >
            Đáp án:
          </Text>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            isReadOnly={!isEdit}
            resize="vertical"
            ref={answerRef}
            borderRadius="md"
            bg="background"
            color="textPrimary"
            fontWeight="medium"
            fontSize="sm"
            boxShadow="sm"
            borderColor="border"
            _placeholder={{ color: "textSecondary" }}
            _focus={{
              borderColor: "brand.500",
              boxShadow: "outline",
            }}
          />
        </Box>
        {isEdit && (
          <Flex justify="flex-end" w="100%" mt={4}>
            <Button colorScheme="green" borderRadius="md" px={8}>
              Lưu
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={6}
        py={6}
        mt={8}
      >
        <Table variant="simple" size="md">
          <Thead bg="background">
            <Tr>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Ý chính
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Điểm số
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Câu hỏi bổ sung
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Đáp án câu bổ sung
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {keyPoints.map((row, index) => (
              <Tr key={row?.MaID || index} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{index + 1}</Td>
                <Td>
                  <Textarea
                    defaultValue={row?.NoiDung || ""}
                    isReadOnly={!isEdit}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    borderRadius="md"
                    bg="background"
                    color="textPrimary"
                    fontWeight="medium"
                    fontSize="sm"
                    boxShadow="sm"
                    borderColor="border"
                    _placeholder={{ color: "textSecondary" }}
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "outline",
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    defaultValue={row?.TyLeDiem || 0}
                    min={0}
                    isReadOnly={!isEdit}
                    borderRadius="md"
                    bg="background"
                    color="textPrimary"
                    fontWeight="medium"
                    fontSize="sm"
                    boxShadow="sm"
                    borderColor="border"
                    _placeholder={{ color: "textSecondary" }}
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "outline",
                    }}
                  />
                </Td>
                <Td colSpan={2}>
                  {row?.CauHoiBoSung?.length > 0 ? (
                    row.CauHoiBoSung.map((cbs, i) => (
                      <Flex
                        key={cbs?.MaCauBoSung || i}
                        gap={2}
                        mb={2}
                        align="flex-start"
                      >
                        <Box flex={1}>
                          <Textarea
                            defaultValue={cbs?.NoiDung || ""}
                            isReadOnly={!isEdit}
                            mb={1}
                            onInput={(e) => {
                              const target = e.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            borderRadius="md"
                            bg="background"
                            color="textPrimary"
                            fontWeight="medium"
                            fontSize="sm"
                            boxShadow="sm"
                            borderColor="border"
                            _placeholder={{ color: "textSecondary" }}
                            _focus={{
                              borderColor: "brand.500",
                              boxShadow: "outline",
                            }}
                          />
                        </Box>
                        <Box flex={1}>
                          <Textarea
                            defaultValue={cbs?.DapAnBoSung || ""}
                            isReadOnly={!isEdit}
                            onInput={(e) => {
                              const target = e.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            borderRadius="md"
                            bg="background"
                            color="textPrimary"
                            fontWeight="medium"
                            fontSize="sm"
                            boxShadow="sm"
                            borderColor="border"
                            _placeholder={{ color: "textSecondary" }}
                            _focus={{
                              borderColor: "brand.500",
                              boxShadow: "outline",
                            }}
                          />
                        </Box>
                      </Flex>
                    ))
                  ) : (
                    <Text color="gray.400" fontStyle="italic">
                      Không có
                    </Text>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default QuestionDetail;
