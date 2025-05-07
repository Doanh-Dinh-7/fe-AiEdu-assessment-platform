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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
      <Box p={8}>
        <Text color="red.500">Không tìm thấy dữ liệu câu hỏi.</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" p={8}>
      <Flex w="100%" maxW="1200px" direction="column" gap={4}>
        <Flex direction="column" justify="space-between" align="center">
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              Chi tiết câu hỏi {maCauHoi}
            </Heading>
          </Center>
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
            />
          </Box>
        </Flex>
        <Table variant="simple" bg="white" mt={4}>
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Ý chính</Th>
              <Th>Điểm số</Th>
              <Th>Câu hỏi bổ sung</Th>
              <Th>Đáp án câu bổ sung</Th>
            </Tr>
          </Thead>
          <Tbody>
            {keyPoints.map((row, index) => (
              <Tr key={row?.MaID || index}>
                <Td>{index + 1}</Td>
                <Td>
                  <Textarea
                    defaultValue={row?.NoiDung || ""}
                    isReadOnly={!isEdit}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    defaultValue={row?.TyLeDiem || 0}
                    min={0}
                    isReadOnly={!isEdit}
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
            <Button colorScheme="blue">Lưu</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default QuestionDetail;
