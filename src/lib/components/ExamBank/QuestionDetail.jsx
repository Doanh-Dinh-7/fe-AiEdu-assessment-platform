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
  Select,
  Button,
  Textarea,
  Center,
} from "@chakra-ui/react";
import QuestionLevelBox from "./QuestionLevelBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const answerData = [
  {
    stt: 1,
    content: "Nội dung câu hỏi 1",
    answer: "Nội dung đáp án 1",
    level: "Dễ",
    mainIdea: "Ý thứ nhất",
    score: 1,
    extraQuestion: "Câu hỏi cho ý 1",
    extraAnswer: "Đáp án cho ý 1",
  },
  // ... thêm các dòng khác nếu cần
];

const QuestionDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { mode = "view" } = location.state || {};
  const isEdit = mode === "edit";

  return (
    <Box minH="100vh" p={8}>
      <Flex w="100%" maxW="1200px" direction="column" gap={4}>
        <Flex justify="space-between" align="center">
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              Chi tiết câu hỏi {id}
            </Heading>
          </Center>
          <QuestionLevelBox easy={10} medium={5} hard={5} />
        </Flex>
        <Table variant="simple" bg="white" mt={4}>
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Câu hỏi</Th>
              <Th>Đáp Án</Th>
              <Th>Mức độ</Th>
              <Th>Ý chính</Th>
              <Th>Điểm số</Th>
              <Th>Câu hỏi bổ sung</Th>
              <Th>Đáp án câu bổ sung</Th>
            </Tr>
          </Thead>
          <Tbody>
            {answerData.map((row, idx) => (
              <Tr key={idx}>
                <Td>{row.stt}</Td>
                <Td>
                  <Textarea
                    defaultValue={row.content}
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
                    defaultValue={row.answer}
                    isReadOnly={!isEdit}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                </Td>
                <Td>
                  <Select defaultValue={row.level} isDisabled={!isEdit}>
                    <option value="Dễ">Dễ</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Khó">Khó</option>
                  </Select>
                </Td>
                <Td>
                  <Textarea
                    defaultValue={row.mainIdea}
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
                    defaultValue={row.score}
                    min={0}
                    isReadOnly={!isEdit}
                  />
                </Td>
                <Td>
                  <Textarea
                    defaultValue={row.extraQuestion}
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
                    defaultValue={row.extraAnswer}
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
