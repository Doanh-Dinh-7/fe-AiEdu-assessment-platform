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
  const navigate = useNavigate();
  const location = useLocation();
  const { maCauHoi } = useParams();
  const { mode, questionDetailData } = location.state || {};
  const [question, setQuestion] = useState(questionDetailData.NoiDung);
  const [answer, setAnswer] = useState(questionDetailData.DapAn[0].NoiDung);
  const keyPoints = questionDetailData.DapAn[0].YChinh;
  const isEdit = mode === "edit";
  const questionRef = useAutoResizeTextarea(question);
  const answerRef = useAutoResizeTextarea(answer);

  return (
    <Box minH="100vh" p={8}>
      <Flex w="100%" maxW="1200px" direction="column" gap={4}>
        <Flex direction="column" justify="space-between" align="center">
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              Chi tiết câu hỏi {maCauHoi}
            </Heading>
          </Center>
          <QuestionLevelBox easy={10} medium={5} hard={5} />
          <Box w="100%" mt={4}>
            <Text fontWeight="bold" mb={1}>
              Câu hỏi:
            </Text>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              isReadOnly={!isEdit}
              resize="vertical"
              minH="100px"
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
              minH="100px"
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
              <Tr key={keyPoints.MaID}>
                <Td>{index + 1}</Td>
                <Td>
                  <Textarea
                    defaultValue={row.NoiDung}
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
                    defaultValue={row.TyLeDiem}
                    min={0}
                    isReadOnly={!isEdit}
                  />
                </Td>
                <Td>
                  <Textarea
                    defaultValue={row.CauHoiBoSung[0].NoiDung}
                    isReadOnly={!isEdit}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                </Td>
                <Td>
                  <Textarea
                    defaultValue={row.CauHoiBoSung[0].DapAnBoSung}
                    isReadOnly={!isEdit}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
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
