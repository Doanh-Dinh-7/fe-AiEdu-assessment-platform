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

  // Nếu không có dữ liệu thì báo lỗi
  if (!questionDetailData) {
    return (
      <Box minH="100vh" bg="#F2F4F8" p={8} fontFamily="Inter, sans-serif">
        <Text color="red.500">Không tìm thấy dữ liệu câu hỏi.</Text>
      </Box>
    );
  }

  return (
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
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <QuestionLevelBox easy={easy} medium={medium} hard={hard} />
        <Box w="100%" mt={4}>
          <Text fontWeight="bold" mb={1}>
            Câu hỏi:
          </Text>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            isReadOnly={!isEdit}
            resize="vertical"
            ref={questionRef}
            borderRadius="12px"
            bg="#F2F4F8"
            color="#1C1C1C"
            fontWeight="medium"
          />

          <Text fontWeight="bold" mt={4} mb={1}>
            Đáp án:
          </Text>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            isReadOnly={!isEdit}
            resize="vertical"
            ref={answerRef}
            borderRadius="12px"
            bg="#F2F4F8"
            color="#1C1C1C"
            fontWeight="medium"
          />
        </Box>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={6}
        py={6}
        mt={8}
      >
        <Table
          variant="simple"
          bg="transparent"
          borderRadius="12px"
          overflow="hidden"
        >
          <Thead bg="#F2F4F8">
            <Tr>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Ý chính
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Điểm số
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Câu hỏi bổ sung
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Đáp án câu bổ sung
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {keyPoints.map((row, index) => (
              <Tr
                key={row?.MaID || index}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{index + 1}</Td>
                <Td>
                  <Textarea
                    defaultValue={row?.NoiDung || ""}
                    isReadOnly={!isEdit}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    borderRadius="12px"
                    bg="#F2F4F8"
                    color="#1C1C1C"
                    fontWeight="medium"
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    defaultValue={row?.TyLeDiem || 0}
                    min={0}
                    isReadOnly={!isEdit}
                    borderRadius="12px"
                    bg="#F2F4F8"
                    color="#1C1C1C"
                    fontWeight="medium"
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
                            borderRadius="12px"
                            bg="#F2F4F8"
                            color="#1C1C1C"
                            fontWeight="medium"
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
                            borderRadius="12px"
                            bg="#F2F4F8"
                            color="#1C1C1C"
                            fontWeight="medium"
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
        {isEdit && (
          <Flex justify="flex-end" mt={4}>
            <Button
              bg="#4A90E2"
              color="#fff"
              borderRadius="999px"
              px={8}
              fontWeight="bold"
              fontSize="16px"
              boxShadow="0 2px 8px rgba(74,144,226,0.08)"
              _hover={{ bg: "#357ABD" }}
            >
              Lưu
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default QuestionDetail;
