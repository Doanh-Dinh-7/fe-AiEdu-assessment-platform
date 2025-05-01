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
  Spinner,
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionLevelBox from "./QuestionLevelBox";
import { getQuestionList } from "../../controller/question"; // Đường dẫn đúng tới hàm API

// const questionData = [
//   {
//     stt: 1,
//     content:
//       "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
//     level: "Dễ",
//     createdAt: "12/04/2025",
//   },
//   {
//     stt: 2,
//     content:
//       "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
//     level: "Trung bình",
//     createdAt: "12/04/2025",
//   },
//   {
//     stt: 3,
//     content:
//       "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
//     level: "Khó",
//     createdAt: "12/04/2025",
//   },
// ];

const ExamQuestion = () => {
  const { maChuong } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tenChuong, setTenChuong] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!maChuong) return;
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getQuestionList(maChuong);
        setTenChuong(data.TenChuong);
        setQuestionData(data.CauHoi);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [maChuong]);

  const countLevel = (MucDo) =>
    questionData.filter((q) => q.MucDo === MucDo).length;

  const handleNavigateQuestion = (q, mode) => {
    navigate(`${location.pathname}/${q.MaCauHoi}`, {
      state: { mode, questionDetailData: q },
    });
  };

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
    </Center>
  ) : (
    <Box minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={5}>
      <Flex w="100%" maxW="1200px" direction="column" gap={4}>
        <Center flex={1}>
          <Heading fontSize="lg" mb={2} textTransform="uppercase">
            Câu hỏi {tenChuong}
          </Heading>
        </Center>
        {/* Box cố định hiển thị số câu hỏi theo cấp độ */}
        <QuestionLevelBox
          easy={countLevel("dễ")}
          medium={countLevel("trung bình")}
          hard={countLevel("khó")}
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
          {questionData.map((q, idx) => (
            <Tr key={q.MaCauHoi}>
              <Td>{idx + 1}</Td>
              <Td>{q.NoiDung}</Td>
              <Td>{q.MucDo}</Td>
              <Td>{q.NgayTao}</Td>
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
